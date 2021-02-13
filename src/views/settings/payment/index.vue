<template>
    <div>
        <cards />
        <baza />
    </div>
</template>

<script>
    import baza from './baza_subscription'
		import cards from "./cards";
    export default {
        name: "payment",
        components: { baza, cards }
    }
</script>
