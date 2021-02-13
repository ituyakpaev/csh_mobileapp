<template >
    <div class="popup" v-show="show">
        <div class="popup__overlay"></div>
        <div class="popup__layout">
            <div class="popup__close" @click="$emit('close')">
                <icon name="close" width="40" />
            </div>
            <div class="popup__content" style="padding: 40px 20px">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modal_box",
        props: {
            show: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
