<template lang="pug">
	.content
		content-item(v-for="item in content", :content="item", :key="item.id")


</template>

<script>
	import {mapState} from "vuex";
	import ContentItem from "../content"

	export default {

		components: {
			ContentItem
		},

		data(){
			return {

			}
		},

		computed: {
			...mapState({
				content: state => state.course.main,
			}),
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