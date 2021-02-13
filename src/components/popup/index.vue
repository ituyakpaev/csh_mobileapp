<template lang="pug">
	transition(mode='out-in', name="popup", @beforeEnter="onStart", @enter="$emit('onOpen')", @afterLeave="onEnd")
		.popup(v-if="value")
			.popup__overlay
			.popup__layout
				.popup__close(v-if="!hideCloseBtn", @click="onClose"): icon(name="close", width="40")
				.popup__content
					slot

</template>

<script>
	export default {

		name: 'popup',

		props: {
			value: {
				type: Boolean,
				default: false
			},

			hideCloseBtn: {
				type: Boolean,
				default: false
			}
		},

		watch:{
			value(val){

				if ( !val ) this.$emit('onClose');
			}
		},


		methods:{
			onClose(e){
				this.$emit('input', false);
			},

			onStart(){
				document.body.style.paddingRight = this.scrollWidth() + 'px';
				document.body.style.overflow = 'hidden';
			},

			onEnd(el){
				if ( !document.getElementsByClassName('popup').length ) {
					document.body.style.overflow = '';
					document.body.style.paddingRight = '';
				}
			},

			scrollWidth(){
				return window.innerWidth - document.body.clientWidth;
			}
		},

	}
</script>

<style lang="scss">


	$popupZIndex: 1000;
	$popupOverlayColor: rgba(#000 ,0.05);
	$colorFocus: $color-blue;
	$fontSize: 14px;
	$boxshadow: none;
	$roundComponent: 0;


	.popup {
		display: block;
		position: fixed;
		height: 100%;
		left: 0;
		top: 0;
		width: 100%;
		z-index: $popupZIndex;
		text-align: center;
		background: transparent;
		overflow: hidden;
		overflow-y: auto;
		font-size: 0;

		&:before {
			content: '';
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}

		&__overlay{
			display: block;
			position: fixed;
			height: 100%;
			left: 0;
			top: 0;
			width: 100%;
			background: $popupOverlayColor;
			backdrop-filter: blur(10px);
		}

		&__layout {
			box-sizing: border-box;
			display: inline-block;
			margin: 0 auto;
			padding: 0;
			position: relative;
			vertical-align: middle;
			max-width: calc(100% - 40px);
			width: 600px;
			min-height: 100px;
			text-align: left;
			font-size: $fontSize;
			box-shadow: $boxshadow;
			border-radius: $roundComponent;
			background: #fff;
			//


		}

		&__close {
			top: 10px;
			right: 10px;
			z-index: 1;
			position: absolute;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background-color: transparent;
			color: $color-grey;

			&:hover{
				color: $color-yellow;
			}
		}

		&__content{
			position: relative;
		}

		&_info{

			.popup__content{
				text-align: center;
			}

			.popup__layout{
				padding: 40px 20px;
			}
		}

		&::v-deep{

			.popup__layout{
				padding: 40px 20px;
			}

			.popup__title{
				font-size: 16px;
				font-weight: 500;
				margin-bottom: 35px;
			}
			.popup__text{

			}

			.popup__footer{
				margin-top: 35px;
			}
		}

	}


</style>


