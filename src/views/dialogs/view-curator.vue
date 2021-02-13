<template lang="pug">
	.dialogs(:class="{'dialogs_item': isDialog}")
		.inner
			.dialogs__inner(v-if="loading")
				.loader
			.dialogs__inner(v-else)
				.dialogs__aside
					dialog-menu

				.dialogs__content
					dialog-item(v-if="isDialog", :id="this.$route.params.item")
					.dialogs__content-message(v-else)
						.dialogs__content-message-title Диалог не выбран
						.dialogs__content-message-text Пожалуйста, выберите диалог

</template>

<script>

	import DialogMenu from './menu/index'
	import DialogItem from './item'

	export default {

		components: {
			DialogMenu, DialogItem
		},

		data(){
			return {
				loading: false
			}
		},

		computed: {

			isDialog(){
				return this.$route.params.item;
			},
		},

		mounted(){
			this.loadCase();
		},

		methods: {

			loadCase(){
				this.loading = true;
				this.$store.dispatch('dialogs/getMenu', this.$route.params.case)
					.finally(()=>{
						this.loading = false;
					});

			},

		},

		watch: {
			'$route' (to, from) {
				if (to.params.case !== from.params.case ) this.loadCase();
			}
		},
	}
</script>

<style scoped lang="scss">

	.dialogs{

		height: 100%;
		position: relative;
		z-index: 901;

		.inner{
			height: 100%;
			box-sizing: border-box;

			@include breakPoint($breakpoint-tablet){
				padding: 20px 0;
			}
		}

		&__inner{
			background: #fff;
			height: 100%;
			margin: 0 -20px;
			box-shadow: $box-shadow;

			@include breakPoint($breakpoint-tablet){
				margin: 0;
				padding: 0;
			}

			@include breakPoint($breakpoint-compact){
				display: flex;
			}
		}

		&__aside{
			position: relative;
			height: 100%;
			box-sizing: border-box;

			@include breakPoint($breakpoint-tablet){
				border-right: 1px solid $color-grey-white;
			}

			@include breakPoint($breakpoint-compact){
				width: (3 * 100% / 10);
				box-sizing: border-box;
			}

			.dialogs_item &{

				@include breakPoint(0, $breakpoint-compact){
					display: none;
				}

			}
		}

		&__content{
			height: 100%;

			@include breakPoint(0, $breakpoint-compact){
				display: none;

				.dialogs_item &{
					display: block;
				}
			}

			@include breakPoint($breakpoint-compact){
				width: (7 * 100% / 10);
				box-sizing: border-box;
			}

			&-message{
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				&-title{
					font-size: 16px;
					font-weight: 500;
				}
				&-text{
					color: $color-grey-text;
				}
			}
		}
	}

</style>