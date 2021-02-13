<template lang="pug">

	.course__case
		.course__title(v-if="content.title", :class="{'link' : slide}", @click="click")
			span(v-html="content.title")
			icon(:name="open ? 'chevron-up' : 'chevron-down'", v-if="slide").arrow
		.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
		slide-up-down(:active="open")
			.course__text
				.course__preview(v-if="content.preview")
					img(v-lazy="content.preview")
				.course__html(v-if="content.html", v-html="content.html")


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
				open: this.content.collapse === undefined || !this.content.collapse,
			}
		},

		computed: {
			slide(){
				return this.content.collapse !== undefined;
			}
		},

		mounted(){

		},

		methods: {
			click(){
				if (this.slide) this.open = !this.open;
			}
		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">

</style>