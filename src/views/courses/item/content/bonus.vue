<template lang="pug">

	.course__case.course__case_bonus
		.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
		.course__bonus
			.course__bonus-info
				.course__title(v-html="content.title")
				.course__text
					.course__bonus-text(v-html="content.html")
			.course__bonus-picture
				.course__bonus-picture-image(v-lazy:background-image="content.image")
					.course__bonus-picture-icon: icon(name="instagram")
				.course__bonus-picture-text Еще больше полезностей в нашем #[a(href="#") Instagram]

</template>

<script>

	export default {

		props: {
			content: {
				type: Object
			}
		},

		data(){
			return {

			}
		},

		computed: {

		},

		mounted(){

		},

		methods: {

		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">

</style>