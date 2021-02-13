<template>
    <div class="notification" v-html="notification.message" v-if="notification.message"
         :style="{ color: notification.status ? 'green' : 'red' }" />
</template>

<script>
    export default {
        name: "notification",
        props: {
            notification: {
                type: Object,
                required: true,
            }
        }
    }
</script>
