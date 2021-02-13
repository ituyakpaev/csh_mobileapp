<template lang="pug">
	.ratio-box(:style="`padding-bottom:${padding}`")
		.ratio-box_inner: slot

</template>

<script>
	export default {
		props: {
			ratio: {
				type: Number,
				default: 1
			},
		},

		computed: {
			padding(){
				return `${100 / this.ratio}%`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ratio-box{
		position: relative;
		display: block;

		&_inner{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>