<template>
    <popup v-model="state" :hide-close-btn="true">
        <div class="popup__layout">
            <div class="h1">
                У вас нет подписки
            </div>
            <div class="text">
                Приобретите подписку, и получите доступ к базе знаний
            </div>
            <div style="display: flex">
                <button_box color="yellow">
                    Приобрести
                </button_box>
                <button_box color="grey" @click="$router.go(-1)">
                    Вернуться назад
                </button_box>
            </div>
        </div>
    </popup>
</template>

<script>
    import popup from '../../components/popup'

    export default {
        name: "payment_required",
        components: { popup },
        props: {
            state: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                opened: true
            }
        }
    }
</script>
