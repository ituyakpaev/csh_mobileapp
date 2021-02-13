<template lang="pug">
	svg.icon(:data-name="name", @click="$emit('click')", xmlns="http://www.w3.org/2000/svg", :width="width", :height="height || width", viewBox="0 0 24 24", role="presentation", :fill="iconColor")
		path(:d="path[name]")
</template>

<script>

	import path from './path'

	export default {

		data(){
			return{
				path
			}
		},

		props: {
			name: {
				type: String,
				default: 'box'
			},
			width: {
				type: [Number, String],
				default: 24
			},
			height: {
				type: [Number, String],
				default: null
			},
			iconColor: {
				type: String,
				default: 'currentColor'
			}
		},

		methods: {

		},
	}
</script>

<style scoped lang="scss">

	.icon{

	}
</style>
