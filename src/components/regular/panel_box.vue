<template>
    <div class="panel">
        <div class="panel__inner" :class="{ padding: padding }">
            <div class="h1" v-if="title" v-html="title" />
            <div class="text" v-if="subtitle" v-html="subtitle" />
            <div class="panel__content" :class="innerClass" >
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "panel_box",
        props: {
            padding: {
                type: Boolean,
                default: true
            },
            title: String,
            subtitle: String,
            innerClass: String
        }
    }
</script>

<style lang="scss">
    .panel {
        background: #fff;
        box-sizing: border-box;
        box-shadow: $box-shadow;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;

        &__inner.padding {
            padding: 20px;
        }

        &__title {
        }

        &__content {
            display: flex;
            flex-direction: column;
        }
    }
</style>
