<template lang="pug">
	.dialog__welcome
		.dialog__welcome-icon: icon(name="sad-emoji", width="50")
		.dialog__welcome-title Ошибка
		.dialog__welcome-text Такаго чата не существует


</template>

<script>

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-error',

		components: {

		},

		data(){
			return {

			}
		},

		computed: {
			...mapState({
				welcome: state => state.dialogs.item.welcome
			}),

		},



	}
</script>

<style scoped lang="scss">


	.dialog__welcome{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		box-sizing: border-box;
		height: 100%;
		max-width: 400px;
		margin: 0 auto;
		text-align: center;

		&-icon{

		}
		&-title{
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 9px;
		}
		&-text{}
		&-image{
			width: 42px;
			height: 42px;
			border-radius: 50%;
			background: no-repeat 50% 50%;
			background-size: cover!important;
			position: relative;
			margin-top: 36px;

			.is-online{
				position: absolute;
				background: $color-green;
				width: 4px;
				height: 4px;
				border-radius: 50%;
				border: 2px solid #fff;
				right: 2px;
				bottom: 2px;
			}
		}
		&-text{
			color: $color-grey-text;
		}
		&-curator{

		}
	}

</style>