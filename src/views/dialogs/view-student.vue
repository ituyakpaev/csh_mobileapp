<template lang="pug">
	.dialogs
		.inner
			.dialogs__inner
				.dialogs__content
					dialog-item(:id="dialogId")


</template>

<script>

	import DialogItem from './item'

	export default {

		components: {
			DialogItem
		},

		data(){
			return {
				loading: false
			}
		},

		created(){
			// if ( this.dialogId === 'all' ){
			// 	const firstDialog = this.$store.getters['base/localNavigation'](this.$route.meta.section).find( i => i.key_id !== 'all');
			// 	this.$router.push(firstDialog && firstDialog.route ? firstDialog.route : '/')
			// }
		},

		computed: {

			dialogId(){
				return this.$route.params.case;
			}

		},

		mounted(){
			this.loadDialog();
		},

		methods: {

			loadDialog(){

			},

		},

		watch: {

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
		}


		&__content{
			height: 100%;


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

			&::v-deep{

				.dialog__head{
					max-width: 922px;
					margin-right: auto;
					margin-left: auto;
				}

				.dialog__writing{
					max-width: 922px;
					margin-right: auto;
					margin-left: auto;
				}

				.dialog__assets{
					max-width: 922px;
					margin-right: auto;
					margin-left: auto;
				}

				.dialog__chat-content{
					width: 100%;
					max-width: 922px;
					margin-right: auto;
					margin-left: auto;
				}
			}
		}
	}

</style>