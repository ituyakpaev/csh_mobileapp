<template>
    <div class="inner faq-container">
        <sidebar :faq="faq"/>
        <div class="faq-width">
            <faq :faq="faq"/>
        </div>
    </div>
</template>

<script>
    // router-view может быть либо факом, либо
    import sidebar from "./sidebar";
    import faq from "./faq";

    export default {
        name: "index",
        components: {sidebar, faq},
        data() {
            return {
                faq: [
                    {
                        name: "Использование Cake School",
                        questions: [
                            {
                                name: "Надо ли смазывать силиконовую форму для выпечки?",
                                request:
                                    "Желатин (от лат. gelatus — замерзший, застывший) — белковое желирующее вещество из коллагена, который содержится в костях, хрящах, коже и жилах животных, которое доказывает, что даже в двадцатом веке ещё можно  придумать что-то интересное, простое и понятное, что захватит весь мир в сладкий плен. Их аромат чувствуешь издалека, а желание съесть парочку возникает практически мгновенно, как только видишь эти круглые пышные булочки.",
                                files: {
                                    documents: [
                                        {
                                            volume: "3.3mv",
                                            name: "Имя документа",
                                            link: "drive.google.com",
                                        },
                                    ],
                                },
                            },
                            {
                                name: "Почему опадает бисквит после выпечки?",
                                request:
                                    "Товарищи! реализация намеченных плановых заданий представляет собой интересный эксперимент проверки соответствующий условий активизации. Не следует, однако забывать, что сложившаяся структура организации позволяет выполнять важные задания по разработке соответствующий условий активизации.",
                                files: {},
                            },
                        ],
                    },
                    {
                        name: "Безопасность и вход",
                        questions: [
                            {
                                name: "Как защищены мои персональные данные",
                                request:
                                    "Желатин (от лат. gelatus — замерзший, застывший) — белковое желирующее вещество из коллагена, который содержится в костях, хрящах, коже и жилах животных, которое доказывает, что даже в двадцатом веке ещё можно  придумать что-то интересное, простое и понятное, что захватит весь мир в сладкий плен. Их аромат чувствуешь издалека, а желание съесть парочку возникает практически мгновенно, как только видишь эти круглые пышные булочки.",
                                files: {
                                    documents: [
                                        {
                                            volume: "3.3mv",
                                            name: "Имя документа",
                                            link: "drive.google.com",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            };
        },
    };
</script>

<style scoped lang="scss">
    .faq-container {
        display: flex;
        @include media(xs) {
						flex-direction: column;
						max-width: 100vw;
        }
    }

    .faq-theme {
        &__input {
            display: none;
            @include media(xs) {
                display: block;
                background-color: #fff;
                padding: 20px 20px 20px 60px;
                border-bottom: 1px solid #ececec;
                width: 100%;
                background-repeat: no-repeat;
                background-position: 30px center;
                background-size: 13px 14px;
                margin: 30px 0px 0px 0px;
            }
        }
		}
		.faq-width{
			width: 100%;
		}
</style>
