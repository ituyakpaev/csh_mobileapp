<template lang="pug">
	.lesson-card__item
		.lesson-card__inner
			router-link.lesson-card__image(tag="div", v-lazy:background-image="item.image", :to="`/lessons/${item.id}`")
			.lesson-card__body
				router-link.lesson-card__title(tag="div", :to="`/lessons/${item.id}`", v-clamp, v-html="item.name")
				.lesson-card__info
					.lesson-card__info-item
						icon(name="info-rate")
						span(v-html="item.props.complexity")
					.lesson-card__info-item
						icon(name="info-play")
						span(v-html="item.props.duration")
					.lesson-card__info-item
						icon(name="info-doc")
						span(v-html="item.props.pages")
				.lesson-card__price
					.lesson-card__price-value {{ item.price }} руб.
					.lesson-card__price-btn: btn-item(yellow): icon(name="cart-btn")



</template>

<script>

	export default {

		name: "lesson-card",

		props: ['item'],

		data(){
			return {

			}
		},

		computed: {

		},

		methods: {

		},

		watch: {

		},

	}

</script>

<style scoped lang="scss">

	.lesson-card{

		&__item{
			box-sizing: border-box;
			padding: 10px;
			width: (100% / 2);

			@include breakPoint($breakpoint-tablet){
				width: (100% / 3);
			}
		}

		&__inner{
			background: #fff;
			box-shadow: $box-shadow;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		&__image{
			height: 107px;
			background: no-repeat 50% 50%;
			background-size: cover;
			cursor: pointer;
			box-sizing: border-box;
			padding-top: 10px;
			display: flex;
			flex-direction: column;

			@include breakPoint($breakpoint-tablet){
				height: 153px;
			}

			@include breakPoint($breakpoint-compact){
				height: 107px;
				padding-top: 15px;
			}

			@include breakPoint($breakpoint-desktop){
				height: 153px;
			}

			@include breakPoint($breakpoint-hd){
				height: 194px;
			}
		}
		&__body{
			padding: 10px;
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;

			@include breakPoint($breakpoint-tablet){
				padding: 15px;
			}

			@include breakPoint($breakpoint-hd){
				padding: 20px;
			}
		}

		&__title{
			font-size: 12px;
			font-family: $font-title;
			font-weight: 400;
			margin-bottom: 5px;
			max-height: 36px;
			cursor: pointer;

			@include breakPoint($breakpoint-tablet){
				font-size: 18px;
				max-height: 54px;
			}

			@include breakPoint($breakpoint-compact){
				font-size: 16px;
				max-height: 48px;
			}

			@include breakPoint($breakpoint-desktop){
				font-size: 18px;
				max-height: 54px;
			}
		}

		&__info{
			font-size: 10px;
			flex: 1 1 auto;

			@include breakPoint($breakpoint-tablet){
				font-size: 13px;
			}

			@include breakPoint($breakpoint-compact){
				font-size: 12px;
			}

			@include breakPoint($breakpoint-desktop){
				font-size: 13px;
			}

			&-item{
				margin: 2px 0;
				color: $color-grey-text;
				display: flex;

				.icon{
					color: #ccc;
					width: 16px;
					height: 16px;
					margin-right: 5px;

					@include breakPoint($breakpoint-tablet){
						width: 20px;
						height: 20px;
					}
				}
			}
		}

		&__price{
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-value{
				font-size: 14px;
				font-weight: 400;

				@include breakPoint($breakpoint-tablet){
					font-size: 20px;
				}

				@include breakPoint($breakpoint-compact){
					font-size: 18px;
				}

				@include breakPoint($breakpoint-desktop){
					font-size: 20px;
				}
			}

			&-btn{}
		}

	}

</style>