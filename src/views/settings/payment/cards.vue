<template>
    <panel_box :title="title" :subtitle="subtitle">
        <div class="payments__cards" v-if="isLoading">
            <div class="payments__card" v-for="card in 3" :key="card" >
                <div class="payments__card-box loading"></div>
            </div>
        </div>
        <div class="payments__cards" v-else >
            <div class="payments__card" v-for="(card, index) in data" :key="card.id">
                <div class="payments__card-box" @click="confirmDeleteCard(card.id, index)">
                    <img class="payments__card-ps" :src="`${basePath}img/cards/${ card.type.toLowerCase() }.png`"/>
                    <div class="payments__card-remove" @click="confirmDeleteCard(card.id, index)" />
                    <div class="payments__card-content payments__card-number" v-html="card.last"/>
                </div>
            </div>
            <div class="payments__card payments__card-add" @click="linkCard">
                <div class="payments__card-box">
                    <div class="payments__card-add__img">
                        <img :src="`${basePath}img/cards/visa.png`"/>
                        <img :src="`${basePath}img/cards/mastercard.png`"/>
                    </div>
                    <div class="payments__card-content payments__card-add__text" >
                        <div class="payments__card-add__icon">
                            <icon name="plus"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal_box :show="modal_delete.show" @close="modal_delete.show = false">
            <div v-if="modal_delete.mode === 'confirm'">
                <div class="text" v-text="'Вы уверены, что хотите удалить карту?'" />
                <div style="display: flex">
                    <notification :notification="modal_delete.notification" />
                    <button_box title="Да" @click="deleteCard" :performing="isPerforming" />
                    <button_box title="Отмена" color='grey' @click="modal_delete.show = false" />
                </div>
            </div>
            <div v-else style="display: flex">
                <button_box title="Удалить карту" @click="confirmDeleteCard" />
                <button_box title="Отмена" color='grey' @click="modal_delete.show = false" />
            </div>
        </modal_box>

    </panel_box>
</template>

<script>
import panel_box from "@/components/regular/panel_box";
import user from "@/middleware/v1/api/user";
import modal_box from "@/components/popup/modal";
import notification from "@/components/notification";
import { DOMAIN } from "@/middleware/v1/helpers";

export default {
    name: "cards",
    components: {modal_box, panel_box, notification},
    data() {
        return {
            isLoading: true,
            isPerforming: false,
            title: "Способы оплаты",
            subtitle: "Мы бережно храним ваши данные карты и не передаем их третьим лицам.",
            errorLogPerforming: [],
            errorLog: [],
            data: [],
            demo_data: [
                {
                    id: "123",
                    last: 4254,
                    type: "visa2",
                },
                {
                    id: "123",
                    last: 4254,
                    type: "visa2",
                },
                {
                    id: "123",
                    last: 4254,
                    type: "visa2",
                }, {
                    id: "123",
                    last: 4254,
                    type: "visa2",
                },

            ],
            modal_delete: {
                show: false,
                mode: 'confirm',
                card_id: null,
                card_index: null,
                notification: {
                    status: false,
                    message: null
                }
            }
        };
    },
    methods: {
        getData: async function () {
            this.$store.commit('base/SET_CARDS', {
                //rows: this.demo_data
            })
            this.isLoading = true;

            await user.getCards()
                .then((res) => {
                    this.$store.commit('base/SET_CARDS', {
                        rows: res.data.cards
                    })
                    this.data = res.data.cards
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });

            this.isLoading = false;
        },
        confirmDeleteCard(id, index) {
            this.modal_delete.mode = 'confirm'
            this.modal_delete.show = true
            this.modal_delete.card_id = id
            this.modal_delete.card_index = index
        },
        deleteCard: async function (id = this.modal_delete.card_id) {
            this.isPerforming = true;

            await user.deleteCard(id)
                .then((res) => {
                    if (res.data.status === 'ok') {
                        this.data = this.data.splice(1,this.modal_delete.card_index)
                        this.modal_delete.card_id = null
                        this.modal_delete.card_index = null
                        this.modal_delete.show = false
                    } else {
                        this.modal_delete.notification.message = 'Произошла ошибка при удалении карты.'
                    }
                })
                .catch((err) => {
                    this.modal_delete.notification.message = `Произошла ошибка при удалении карты. Код ошибки ${ err.status }`
                });

            this.isPerforming = false;
        },
        linkCard: async function () {
            window.open(`${ DOMAIN }yandex-checkout-sdk-php/addcard.php`);
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style lang="scss">
.payments {
    &__cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-right: -20px;

        @include media(sm) {
            margin-right: -10px;
        }
    }

    &__card {
        // height: 108px; // ISO/IEC 7810
        // width: 172px;
        //width: 294px;
        //height: 183px;
        width: calc(33% - 20px);
        margin: 0 20px 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        font-family: $font-main;
        cursor: pointer;

        @include media(sm) {
            width: calc(50% - 15px);
            //height: 162px;
            margin-right: 15px;
            margin-bottom: 15px;
        }

        @include media(xs) {
            //width: calc(50% - 15px);
        }

        &:hover .payments__card-remove {
            display: block;
        }

        &-box {
            border-radius: 5px;
            width: 100%;
            padding-bottom: 62%;
            background-image: linear-gradient(
                    122deg,
                    #ffb600 0%,
                    #fff7e4 51%,
                    #ffb600 100%
            );
            pointer-events: none;

            @include media(md) {
                pointer-events: auto;
            }
        }

        &-content {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #141414;
            font-size: 16px;
            font-weight: 400;
            line-height: 21px;
            text-transform: uppercase;

            @include media(xs) {
                font-size: 14px;
                line-height: 18px;
                padding-bottom: 20px;
            }
        }

        &-number {
            &:before {
                content: 'XXXX-XXXX-XXXX-';

                @include media(xs) {
                    content: 'XXXX-'
                }
            }
        }

        &-ps {
            margin-bottom: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: absolute;
            bottom: 15px;
            right: 15px;

            @include media(xs) {
                width: 40px;
                bottom: 0px;
                right: 10px;

                img {
                    width: 100%;
                }
            }

            svg {
                fill: #fff;
            }
        }

        &-remove {
            width: 20px;
            height: 20px;
            background-image: url(../../../../public/svg/remove.svg);
            background-size: 20px 20px;
            position: absolute;
            right: 15px;
            top: 15px;
            display: none;
            pointer-events: auto;
        }

        &-add {

            &__icon {
                margin-right: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #ffb600;
                cursor: pointer;
                svg {
                    fill: #fff;
                }
            }

            &__img {
                display: flex;
                flex-direction: row;
                top: 15px;
                left: 15px;
                position: absolute;

                img {
                    display: block;
                    margin-bottom: 7px;
                    margin-right: 7px;
                    width: auto;
                    object-fit: contain;
                    object-position: left;
                }

                @include media(xs) {
                    display: none;
                    //width: 40px;
                    img {
                        width: 100%;
                    }
                }
            }

            &__text {
                padding-bottom: 0;
                &:after {
                    content: 'Добавить карту';

                    @include media(exs) {
                        content: 'Добавить';
                    }
                }
            }

            .payments__card {
                &-box {
                    background: transparent;
                    border: 1px solid $color-grey-light;
                }
                &-content {
                    text-transform: none;
                }
            }
        }
    }
}
</style>
