<template lang="pug">
	.menu__item(v-if="item.id === undefined || item.disabled", @click="$emit('click')", :class="classlist")
		.menu__item-icon(v-if="item.position")
			span(v-if="iconNumber") {{ item.position }}
			icon(v-else, :name="item.position", width="42")
		.menu__item-info
			.menu__item-title(v-if="item.title", v-html="item.title")
			.menu__item-text(v-if="item.text", v-html="item.text")

	router-link.menu__item(v-else,
		tag="div",
		@click.native="$emit('click')",
		:class="classlist",
		:to="{ name: item.id ? 'courses-item' : 'courses-case', params: { case: $route.params.case, item: item.id }, query: { secret: item.secret } }"
	)
		.menu__item-icon(v-if="item.position")
			span(v-if="iconNumber") {{ item.position }}
			icon(v-else, :name="item.position", width="42")
		.menu__item-info
			.menu__item-title(v-if="item.title", v-html="item.title")
			.menu__item-text(v-if="item.text", v-html="item.text")

</template>

<script>

	import MenuItem from './menu-item'

	export default {

		name: 'menu-item',

		props: ['item'],

		components: {
			MenuItem
		},
		data(){
			return {

			}
		},
		computed: {
			classlist(){
				return {
					'menu__item_done': this.item.done,
					'menu__item_arrow': this.item.submenu && this.item.submenu.length,
					'menu__item_active': this.item.active,
				}
			},

			iconNumber(){
				return typeof this.item.position === "number" || !isNaN(parseInt(this.item.position))
			}
		},
	}
</script>

<style lang="scss">

	.menu{

		&__item{
			display: flex;
			padding: 10px 30px;
			min-height: 60px;
			box-sizing: border-box;
			cursor: pointer;
			user-select: none;

			&:hover{
				background-color: #F5F6F7;
			}

			&.is-active{
				background-color: rgba($color-yellow, .1) !important;
			}

			&_arrow{
				padding-right: 40px;
			}

			&-icon{
				width: 42px;
				height: 42px;
				min-width: 42px;
				margin-right: 10px;
				background: #ECECEC;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24px;
				color: #fff;
				font-weight: 400;

				.menu__item_active &{
					background-color: $color-yellow;
				}

				.menu__item_done &{
					background-color: $color-green;
				}

			}

			&-info{
				margin: -5px 0;
				align-self: center;
			}
			&-title{
				font-size: 14px;
				font-weight: 400;
				margin: 4px 0;
                align-self: center;
			}
			&-text{
				color: $color-grey-text;
				margin: 4px 0;
			}
		}
	}
</style>
