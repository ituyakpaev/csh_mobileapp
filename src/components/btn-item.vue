<template lang="pug">
	link-item(v-if="href", :href="href", :class="classname").btn: slot
	.btn(v-else, @click="(loading || hold || disabled) || $emit('click')", :class="classname"): slot

</template>

<script>

	export default {
		props: {
			yellow: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			hold: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			href: {
				type: String,
				default: ''
			}
		},

		computed: {
			classname(){
				return {
					'btn_yellow': this.yellow,
					'btn_loading': this.loading,
					'btn_hold': this.loading,
					'btn_disabled': this.disabled,
				}
			}
		}
	}

</script>

<style scoped lang="scss">

	.btn{
		display: inline-flex;
		cursor: pointer;
		color: #fff;
		padding: 10px 20px 9px;
		border-radius: 50px;
		background: no-repeat 50% 50% $color-grey;
		background-size: auto 100%;
		font-weight: 400;
		user-select: none;
		align-items: center;
		justify-content: center;
		font-size: 13px;

		&:hover{
			background-color: lighten($color-grey, 10%);
		}

		&:active{
			background-color: lighten($color-grey, 10%);
		}

		&_yellow{
			background-color: $color-yellow;

			&:hover{
				background-color: lighten($color-yellow, 10%);
			}

			&:active{
				background-color: lighten($color-yellow, 10%);
			}
		}

		&_disabled{
			background-color: $color-grey-light !important;
		}

		&_loading{
			color: transparent;
			//background-image: url("../img/svg/loader-white.svg");
		}

		.icon{
			width: 24px;
			height: 24px;
			margin: -6px -10px;
			display: block;

			@include breakPoint($breakpoint-tablet){
				width: 28px;
				height: 28px;
				margin: -6px -10px;
			}

			@include breakPoint($breakpoint-compact){
				width: 24px;
				height: 24px;
				margin: -6px -10px;
			}

			@include breakPoint($breakpoint-desktop){
				width: 28px;
				height: 28px;
				margin: -6px -10px;
			}
		}

	}

</style>


