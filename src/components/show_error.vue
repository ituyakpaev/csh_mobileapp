<template>
    <div class="show-error">
        <div class="show-error__title" @click="opened = !opened">
            Показать ошибку
        </div>
        <transition name="showerror">
            <div class="show-error__error" v-show="opened">
                {{ error }}
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "show_error",
        props: {
            error: String
        },
        data() {
            return {
                opened: false
            }
        }
    }
</script>

<style lang="scss">
    .show-error {
        &__title {
            cursor: pointer;
            text-decoration: underline;
            color: $color-yellow;
            font-size: 14px;

            &:active {
                color: $color-orange;
            }
        }

        &__error {
            line-height: 24px;
        }
    }
    .showerror  {
        &-enter-active, &-leave-active {
            transition: max-height .2s;
            overflow: hidden;
            max-height: 24px;
        }

        &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */ {
            max-height: 0;
        }
    }
</style>
