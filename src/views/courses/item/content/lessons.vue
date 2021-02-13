<template lang="pug">

	.course__case.course__case_cards
		.course__title(v-if="content.title", v-html="content.title")
		.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
		.course__text
			.course__cards
				lesson-card(v-for="card in content.list", :key="card.id", :item="card")

</template>

<script>

	import LessonCard from '../../../lessons/old_card'

	export default {

		components: {LessonCard},

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
