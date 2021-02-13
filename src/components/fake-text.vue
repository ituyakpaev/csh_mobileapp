<template lang="pug">
	.fake-text(:style='`width: ${width}`')

</template>


<script>

	export default {
		props: {
			width: {
				type: String,
				default: '100%'
			},
		}
	}
</script>

<style lang="scss">

	.fake-text{
		max-width: 100%;
		background: rgba($color-grey, .1);
		display: inline-block;
		border-radius: 30px;
		vertical-align: baseline;
		height: 1em;
		animation: pulse 1.5s ease-in-out infinite;
		margin-right: 0.5em;
	}


	@keyframes pulse {
		from {
			opacity: .75;
		}
		33% {
			opacity: 1;
		}
		66% {
			opacity: .5;
		}
		to {
			opacity: .75;
		}
	}

</style>