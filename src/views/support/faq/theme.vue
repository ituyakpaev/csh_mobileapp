<template>
    <div class="faq-theme">
        <div class="faq-theme__title title">{{ theme.name }}</div>
        <div>
            <div v-for="question in theme.questions" :key="question.name">
                <div @click="open(question)" class="faq-theme__question">
                    <div v-html="icon" class="faq-theme__question-icon"
                        :class="{'is-opened':  question.name === opened}"/>
                    {{ question.name }}
                </div>
                <transition name="fade">
                    <div v-show="question.name === opened" class="faq-theme__request">
                        <div class="faq-theme__text">{{ question.request }}</div>
                        <div class="faq-theme__document" v-if="question.files.documents">
                            <doc :key="document.link" v-for="document in question.files.documents"
                                :href="document.link" :title="document.name"/>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import doc from "../../../components/functional/document";
    import svg from "../../../plugins/svg"

    export default {
        name: "theme.vue",
        components: {doc},
        props: {
            theme: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                opened: this.theme.questions[0].name,
            };
        },
        computed: {
            icon() {
                return svg.faq_question()
            }
        },
        methods: {
            open(question) {
                if (this.opened === question.name) {
                    this.opened = ''
                } else {
                    this.opened = question.name;
                }
            },
        },
    };
</script>

<style lang="scss">
    .faq-theme {
        padding: 0px 240px 0px 0px;
        margin: 0px 0px 50px 0px;
        @include media(wd) {
            padding: 0px 40px 0px 0px;
        }
        @include media(xs) {
            padding: 0px 30px 0px 0px;
        }

        &__title {
        }

        &__question {
            color: $color-black;
            font-family: $font-main;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            line-height: 21px;
            display: flex;
            margin-bottom: 10px;
            transition: all 0.3s ease 0s;

            &-icon {
                width: 20px;
                transform-origin: center;
                display: flex;
                justify-content: center;
                align-items: center;
								transition: transform .3s;
								@include media (xs){
									width: 23px;
								}

                path {
                    stroke: $color-grey-light;
                }

                &.is-opened {
										transform: rotate(90deg);
										position: relative;
										@include media (xs){
										align-items: flex-start;
										height: 20px;
										margin-right: 7px;
										}
                    path {
                        stroke: $color-yellow;
                    }
                }
            }
        }

        &__text {
            color: $color-grey-light;
            font-family: $font-main;
            font-size: 14px;
            font-weight: 300;
            line-height: 21px;
            margin: 0px 0px 15px 0px;
        }

        &__document {
            margin: 13px 0px 28px 0px;
        }

      &__request {
        transform: translateX(0) ;
        transform-origin: top;
        opacity: 1;
      }
    }

    .is-opened {
    }

    .fade {
        &-enter-to, &-leave {
        }

        &-enter-active, &-leave-active {
            transition: opacity .3s cubic-bezier(0.25, 1, 0.25, 1), transform .6s cubic-bezier(0.25, 1, 0.25, 1), max-height .01s cubic-bezier(0.25, 1, 0.25, 1) .6s;
            will-change: opacity, transform, max-height;

        }

        &-enter, &-leave-to {
            transform: translateY(-50px);
            opacity: 0;
          max-height: 0;
        }
    }
</style>
