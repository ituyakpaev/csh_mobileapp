<template>
    <div class="main-message">
        <div class="main-message__title">
            Произошла ошибка :(
        </div>
        <div class="show-error">
            <div class="show-error__title" @click="opened = !opened">
                Показать ошибку
            </div>
            <transition name="showerror">
                <div class="show-error__error" v-show="opened">
                    #{{ error.code }}<br>
                    {{ error.text }}
                </div>
            </transition>
        </div>
        <div class="main-message__row">
            <button-box v-for="(btn, index) in buttons" :key="index"
                :color="btn.color || 'yellow'" :title="btn.title" @click="$emit('click', btn.id)" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "error",
        props: {
            error: {
                type: Object,
                required: true
            },
            buttons: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                opened: false
            }
        }
    }
</script>

<style lang="scss">
.main-message {
    &__title {
        font-size: 20px;

        @include media(md) {
            font-size: 16px;
        }
        margin: .5em 0 .5em;
    }
}
</style>
