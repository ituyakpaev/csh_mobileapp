<template>
    <div class="warning">
        <div class="warning__title h1">
            {{ title }}
        </div>
        <div class="warning__text text">
            {{ text }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "notification",
        props: {
            title: {
                required: true
            },
            text: {
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .warning {
        background-color: #44525f;
        padding: 15px 20px;
        width: 100%;

        * {
            color: white
        }
    }
</style>
