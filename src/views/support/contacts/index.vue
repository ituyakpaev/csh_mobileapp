<template>
    <div class="inner content">
        <panel_box :title="$route.meta.title" :subtitle="subtitle" >
            <div class="support-contacts">
                <a v-for="(contact, id) in contacts" :key="id"
                   class="support-contacts__item" :href="contact.url" target="_blank">
                    <icon :name="id" class="support-contacts__icon"/>
                    <span v-text="contact.title + ': '" />
                    <div class="support-contacts__link" v-text="contact.content" />
                </a>
            </div>
        </panel_box>
    </div>
</template>

<script>
    import panel_box from "@/components/regular/panel_box";
    export default {
        name: "index",
        components: {panel_box},
        data() {
            return {
                contacts: {
                    telegram: {
                        title: 'Телеграм',
                        url: 'tg://resolve?domain=79269551492',
                        content: '+7 (926) 955-14-92'
                    },
                    whatsapp: {
                        title: 'Whatsapp',
                        url: 'https://wa.me/79269551492',
                        content: '+7 (926) 955-14-92'
                    },
                    vk_adaptive: {
                        title: 'Вконтакте',
                        url: 'https://vk.com/kursy_konditera',
                        content: 'Курсы кондитера | Cake School Алины Макаровой'
                    },
                    email: {
                        title: 'Почта',
                        url: 'mailto:info@cake-school.com',
                        content: 'info@cake-school.com'
                    }
                },
                subtitle: 'Если у вас появилась проблема, напишите нам в удобный для вас месседжер.',
            }
        }
    }
</script>

<style lang="scss">
    .support-contacts {
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        &__item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            margin-bottom: 10px;
            font-size: 14px;
            flex-wrap: wrap;

            &:hover {
                .support-contacts__icon {
                    color: $color-yellow;
                }
            }
        }

        &__icon {
            color: $color-grey;
            margin-right: 5px;
        }

        span {
            font-weight: 500;
            white-space: pre-wrap;
        }

        &__link {
            text-decoration: underline;
            color: $color-grey; //$color-yellow;
            font-weight: 500;
        }
    }
</style>
