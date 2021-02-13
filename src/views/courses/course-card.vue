<template lang="pug">
	.course-card__item
		.course-card__inner
			router-link.course-card__image(tag="div", v-lazy:background-image="item.image", :to="`/courses/${item.id}`")
				.course-card__label(v-if="item.label", v-html="item.label")
				.course-card__error(v-if="item.error", v-html="item.error")
			.course-card__body
				.course-card__title(v-html="item.title")
				.course-card__info
					.course-card__info-item(v-if="item.start")
						b Старт:
						span(v-html="item.start")
					.course-card__info-item(v-if="item.info")
						b О чем курс:
						span(v-html="item.info")
					.course-card__info-text(v-if="item.text")
						span(v-html="item.text")

				//-.course-card__link
					router-link(:to="`/courses/${item.id}`") {{ item.link_text || 'На страницу курса' }}

				.course-card__footer
					.course-card__status(v-if="item.status")
						| {{ item.status.text }}
						span.course__main-status-icon(
							v-if="item.status.type",
							:class="`course__main-status-icon_${item.status.type}`")
								icon(name="status-ok")

					.course-card__buttons(v-if="item.btns")

						.course-card__buttons-item(v-for="btn in item.btns")
							btn-group(v-if="Array.isArray(btn)")
								btn-item(v-for="item in btn", :yellow="item.yellow", :href="item.course_id ? `/courses/${item.course_id}` : item.url") {{ item.text }}
							btn-item(v-else, :yellow="btn.yellow", :href="btn.course_id ? `/courses/${btn.course_id}` : btn.url") {{ btn.text }}


</template>

<script>

	export default {

		name: "card-case",
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

<style lang="scss">

	.course-card{

		&__item{
			box-sizing: border-box;
			padding: 10px;
			min-width: 0;

			@include breakPoint($breakpoint-tablet){
				width: 50%;
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
			height: 110px;
			background: no-repeat 50% 50%;
			background-size: cover;
			cursor: pointer;
			box-sizing: border-box;
			padding-top: 10px;
			display: flex;
			flex-direction: column;

			@include breakPoint($breakpoint-tablet){
				height: 135px;
			}

			@include breakPoint($breakpoint-compact){
				height: 161px;
				padding-top: 15px;
			}

			@include breakPoint($breakpoint-desktop){
				height: 216px;
			}

			@include breakPoint($breakpoint-hd){
				height: 300px;
			}
		}
		&__body{
			padding: 14px 10px;
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;

			@include breakPoint($breakpoint-tablet){
				padding: 20px 20px;
			}

			@include breakPoint($breakpoint-hd){
				padding: 25px 30px;
			}
		}
		&__title{
			font-size: 20px;
			font-family: $font-title;
			font-weight: 400;
			margin-bottom: 10px;
		}
		&__info{
			flex: 1 1 auto;
			&-item{
				margin: 5px 0;

				b{
					margin-right: 5px;
				}
				span{
					color: $color-grey-text;
				}
			}

			&-text{
				font-size: 14px;
				line-height: (21 / 14);
			}
		}
		&__link{
			font-size: 14px;
			font-weight: 400;
			margin-top: 10px;

			a{
				color: $color-yellow;

				&:hover{
					text-decoration: underline;
				}
			}
		}

		&__label,
		&__error{
			font-size: 14px;
			color: #fff;
			background: $color-yellow;
			padding: 8px 30px;
			border-radius: 0 50px 50px 0;
			display: inline-block;
			margin-bottom: 10px;
			margin-right: auto;

			@include breakPoint($breakpoint-compact){
				margin-bottom: 15px;
			}
		}

		&__error{
			background: $color-red;
		}

		&__footer{

			@include breakPoint($breakpoint-compact){
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}
		}


		&__status{
			font-size: 16px;
			font-weight: 400;
			margin-top: 10px;
			margin-right: 10px;
		}

		&__buttons{

			@include breakPoint($breakpoint-compact){
				margin: 0 -5px;
				display: flex;
				flex-wrap: wrap;
				max-width: calc(100% + 10px);
			}

			&-item{
				margin-top: 10px;

				@include breakPoint($breakpoint-compact){
					padding: 0 5px;
					max-width: 100%;
					box-sizing: border-box;
				}

				&::v-deep{

					.btn-group{
						width: 100%;

						@include breakPoint($breakpoint-compact){
							width: auto;
							max-width: 100%;
						}

						.btn{
							width: auto;

							@include breakPoint(0, $breakpoint-compact){
								flex: 1 1 auto;
							}
						}
					}

					.btn{
						width: 100%;
						box-sizing: border-box;

						min-width: 0;
						//overflow: hidden;
						//text-overflow: ellipsis;
						//display: block;
					}
				}

			}

		}
	}


</style>
