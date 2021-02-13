<template>
    <panel_box title="База знаний" subtitle=" ">
        <div v-if="subscription.loaded">
            <modal_box :show="unsubscribe.confirm_show">
                <div v-html="unsubscribe.confirm_text"  />
                <notification :notification="unsubscribe.notification" />
                <div style="display: flex">
                    <button_box title="Отписаться" :perfoming="unsubscribe.isPerforming" @click="cancelSubscription" />
                    <button_box title="Отменить" color="grey" @click="unsubscribe.confirm_show = false" />
                </div>
            </modal_box>
            <div class="payments-baza__table">
                <div v-if="!subscription.data.state && !subscription.data.attempts_count" class="payments-baza__row">
                    <div class="payments-baza__cell" >
                        Подписок пока нет
                        <button_box color='grey' title="Оформить" @click="buySubscription" />
                    </div>
                </div>
                <div v-else class="payments-baza__row">
                    <div class="payments-baza__cell-group">
                        <div class="payments-baza__cell">
                            <template v-if="subscription.data.access_date">До {{ subscription.data.access_date | date }}</template>
                            <template v-else >{{ subscription.data.active ? 'Доступ приостановлен' : 'Подписка отменена' }}</template>
                        </div>
                        <div class="payments-baza__cell payments-baza__label payments-baza__plan">
                            {{ subscription.data.plan | plan }}
                        </div>
                    </div>
                    <div class="payments-baza__cell-group">
                        <div class="payments-baza__cell payments-baza__card" v-if="cards.loaded">
                            <template v-if="cards.rows.length > 0">
                                <img class="payments-baza__card-img" :src="`${ basePath }img/cards/${ card.type.toLowerCase() }.png`"/>
                                <span class="payments-baza__card-number" v-text=" card.last " />
                            </template>
                        </div>
                        <div class="payments-baza__cell payments-baza__next-payment" v-if="!subscription.data.active">
                            <span class="payments-baza__label" v-text="'Подписка отменена'" />
                            <div class="c-yellow payments-baza__resubscribe" v-text="'Возобновить'" @click="resubscribe" />
                        </div>
                        <div class="payments-baza__cell payments-baza__next-payment" v-else-if="!subscription.data.state">
                            <span class="payments-baza__label" v-text="'Доступ приостановлен'" />
                            <div class="c-yellow payments-baza__resubscribe" v-text="'Возобновить'" @click="resubscribe" />
                        </div>
                        <div class="payments-baza__cell payments-baza__next-payment" v-else>
                            <span class="payments-baza__label" v-text="'Следующий платеж'" />
                            <span >{{ subscription.data.next_payment_date | date }}</span>
                        </div>
                    </div>
                    <div class="payments-baza__cell payments-baza__more">
                        <tooltip interactive placement="bottom-start" boundary="window" theme="menu" distance="10" animation="fade" trigger="mouseenter" arrow>
                            <template slot="trigger">
                                <icon name="dots" />
                            </template>
                            <template>
                                <div v-if="subscription.data.state" @click="unsubscribe.confirm_show = true" class="payments-baza__unsubscribe">
                                    Отписаться
                                </div>
                                <div v-else @click="resubscribe" class="payments-baza__unsubscribe">
                                    Возобновить подписку
                                </div>
                            </template>
                        </tooltip>
                    </div>
                </div>
            </div>
        </div>
    </panel_box>
</template>

<script>
    import panel_box from "@/components/regular/panel_box";
    import modal_box from "@/components/popup/modal";
    import { mapState } from 'vuex'
    import { DOMAIN } from "@/middleware/v1/helpers";
    import baza from "@/middleware/v1/api/baza";
    import notification from "@/components/notification";

    export default {
        name: "baza_subscription",
        components: { panel_box, modal_box, notification },
        data() {
            return {
                title: 'База знаний',
                subtitle: '',
                unsubscribe: {
                    isPerforming: false,
                    confirm_show: false,
                    confirm_text: 'Вы уверены, что хотите отписаться от базы знаний?',
                    notification: {
                        status: false,
                        message: null
                    }
                },
                table: {
                    headers: {
                        start_date: {},
                        title: {},
                        plan: {},
                        card: {},
                        next_payment_date: {}
                    },
                    data: []
                }
            }
        },
        filters: {
            plan(value) {
                let data = {
                    monthly: 'Ежемесячный план',
                    yearly: 'Годовой план',
                    demo_month: 'Ежедемесячный демо-план',
                    demo_year: 'Годовой демо-план'
                }
                return data[value] || ''
            },
            date(value) {
                if (!value) return ""
                if (!new Date(value * 1000)) return ""
                let months = [
                    'Января',
                    'Февраля',
                    'Марта',
                    'Апреля',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                ]
                let date = new Date(value * 1000)
                return `${ date.getDay() } ${ months[date.getMonth()].toLowerCase() } ${ date.getFullYear() }`

            }
        },
        computed: {
            ...mapState({
                cards: state => state.base.cards,
                subscription: state => state.baza.subscription
            }),
            card() {
                if (this.cards.loaded) {
                    if (this.cards.rows.length > 0) {
                        return this.cards.rows[0]
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        },
        methods: {
            cancelSubscription: async function () {
                this.unsubscribe.isPerforming = true

                await baza.unsubscribe()
                    .then(res => {
                        this.unsubscribe.confirm_show = false
                        this.$store.commit('baza/setSubscription', { state: false })
                    })
                    .catch(err => {

                    })

                this.unsubscribe.isPerforming = false
            },
            buySubscription() {
                window.open(`${ DOMAIN }baza/#pay`)
            },
            resubscribe() {
                let plan_id = {
                    monthly: 3377,
                    yearly: 3378,
                    // TODO: demo
                }
                if (!plan_id[this.subscription.data.plan]) return

                window.open(`${ DOMAIN }yandex-checkout-sdk-php/subscribe.php?resubscribe=true&id=${ plan_id[this.subscription.data.plan] }&token=${ this.$store.state.base.session.token }`)
            }
        },
        created() {
            if (!this.subscription.loaded) {
                this.$store.dispatch('baza/getSubscription')
            }
        }
    }
</script>

<style lang="scss">
    .payments-baza {
        &__table {
            margin: 20px -20px -20px -20px;
        }

        &__row {
            border-top: 1px solid $color-grey-white;
            min-height: 62px;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            position: relative;

            @include media(exs) {
                flex-direction: column;
            }
        }

        &__cell {
            flex: 1 1;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            @include media(exs) {
                padding-bottom: 5px;
            }

            &-group {
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex: 1 1;

                @include media(xs) {
                    flex-direction: column;
                    justify-content: flex-start;
                }
            }
        }

        &__resubscribe {
            cursor: pointer;
        }

        &__label {
            color: $color-grey-light;
        }

        &__more {
            flex: unset;
            cursor: pointer;
            width: max-content;

            @include media(exs) {
                position: absolute;
                right: 0;
            }
        }

        &__unsubscribe {
            cursor: pointer;
        }

        &__card {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            span {
                white-space: nowrap;
            }

            &-number:before {
                content: 'XXXX-XXXX-XXXX-';

                @include media(sm) {
                    content: 'XXXX-';
                }
            }

            &-img {
                margin-right: 8px;
                height: 1.5em;
            }
        }

        &__next-payment {
            align-items: flex-end;
            padding-right: 10px;

            @include media(xs) {
                display: none;
            }
        }
    }
</style>
