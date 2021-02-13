<template lang="pug">
	.dialog__head(v-if="loading")
		.dialog__head-theme
			.dialog__head-image
			.dialog__head-title: fake-text(width="150px")

	.dialog__head(v-else)
		.dialog__head-theme
			.dialog__head-image(v-lazy:background-image="info.image")
			.dialog__head-title {{ info.title }}

		//-.dialog__head-settings
			tooltip(
				interactive,
				placement="bottom-start",
				boundary="window",
				theme="menu",
				distance="20",
				animation="fade",
				trigger="click",
				arrow,
				)
				template(slot="trigger")
					icon(name="dots")
				template
					.link Вернуться на сайт
					hr
					.link Выйти из ЛК

</template>

<script>

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-head',

		props: {
			loading: {
				type: Boolean,
				default: false
			}
		},

		components: {

		},

		data(){
			return {

			}
		},

		computed: {
			...mapState({
				info: state => state.dialogs.item.main,
			}),

		},

		mounted(){

		},

		methods: {

		},

	}
</script>

<style scoped lang="scss">


	.dialog__head{
		box-sizing: border-box;
		display: flex;
		padding: 5px 20px;
		align-items: center;
		justify-content: space-between;
		height: 100%;


		&-theme{
			display: flex;
			align-items: center;
		}

		&-image{
			width: 42px;
			min-width: 42px;
			height: 42px;
			border-radius: 50%;
			margin-right: 10px;
			background: $color-grey-white no-repeat 50% 50%;
			background-size: cover!important;
		}

		&-title{
			font-weight: 400;
		}

		&-settings{
			font-size: 0;
			color: $color-grey-light;
			cursor: pointer;

			&:hover{
				color: $color-yellow;
			}

			.icon{

			}
		}
	}

</style>