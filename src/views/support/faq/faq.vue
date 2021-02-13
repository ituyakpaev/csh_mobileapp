<template>
    <div class="faq-body">
        <theme v-for="theme in faq" :theme="theme" :key="theme.name"/>
    </div>
</template>

<script>
    import theme from "./theme";


    export default {
        name: "faq.vue",
        components: {theme},
        props: {
            faq: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="scss">
	.faq-body{
		margin: 30px 0px;
		background-color: #ffffff;
		padding: 30px 0px 50px 40px;
			@include media (xs){
				margin: 0px 0px 0px 0px;
		}
	}
</style>
