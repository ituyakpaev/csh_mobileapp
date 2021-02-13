<template lang="pug">
	.dialogs__menu
		.dialogs__menu-search(v-if="!(!menu && !loading)")
			icon.dialogs__menu-search-lens(name="lens")
			input.dialogs__menu-search-input(:class="{'is-filled': search}", type="text", v-model="search", placeholder="Поиск по диалогам...", @keyup="onSearch")
			icon.dialogs__menu-search-clear(name="close", @click="clearSearch", v-show="search")
		.dialogs__menu-body
			.dialogs__menu-list(v-scrollbar)
				.dialogs__menu-inner
					.loader(v-if="loading")
					.dialogs__menu-message(v-else-if="!menu")
						.dialogs__menu-message-icon: icon(name="sad-emoji", width="50")
						.dialogs__menu-message-text Такого диалога не существует
					template(v-else-if="menu.length")
						.dialogs__menu-group(v-for="(group, idx) in menu", :key="idx")
							.dialogs__menu-title(v-if="group.title", v-html="group.title")
							.dialogs__menu-list
								router-link.dialogs__menu-item(
									v-for="item in group.items",
									:key="item.id",
									tag="div",
									:to="`/dialogs/${$route.params.case || 'all'}/${item.id}`"
								)
									icon.dialogs__menu-item-label(name="label", v-if="item.label")
									.dialogs__menu-item-image(v-lazy:background-image="item.image")
									.dialogs__menu-item-info
										.dialogs__menu-item-title {{ item.title }}
										.dialogs__menu-item-text {{ item.text | nohtml }}
									.dialogs__menu-item-more
										.dialogs__menu-item-date {{ item.date }}
										.dialogs__menu-item-count(v-if="item.count && item.count > 0") {{ item.count | roundCounter }}
										.dialogs__menu-item-point(v-else-if="item.unread")
					.dialogs__menu-message(v-else-if="search")
						.dialogs__menu-message-icon: icon(name="sad-emoji", width="50")
						.dialogs__menu-message-text По запросу "{{ search }}" ничего не найдено

</template>

<script>

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-menu',

		data(){
			return {
				loading: false,
				timer: null
			}
		},

		computed: {
			...mapState({
				menu: state => state.dialogs.menu,
			}),

			search: {
				get(){
					return this.$store.state.dialogs.search
				},
				set(value){
					this.$store.commit('dialogs/SET_SEARCH', value)
				}
			}
		},


		methods: {
			onSearch(){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.loading = true;
					if ( this.search ){
						this.$store.dispatch('dialogs/searchMenu', this.$route.params.case)
							.finally(()=>{
								this.loading = false;
							});
					} else {
						this.$store.dispatch('dialogs/getMenu', this.$route.params.case)
							.finally(()=>{
								this.loading = false;
							});
					}
				}, 500)
			},

			clearSearch(){
				this.search = '';
				this.loading = true;
				this.$store.dispatch('dialogs/getMenu', this.$route.params.case)
					.finally(()=>{
						this.loading = false;
					});
			}
		}

	}
</script>


<style lang="scss">

	.dialogs{
		&__menu{
			height: 100%;
			display: flex;
			flex-direction: column;

			&-search{
				height: 60px;
				width: 100%;
				font-weight: 500;
				min-height: 60px;
				position: relative;

				&-lens{
					position: absolute;
					color: $color-yellow;
					top: 18px;
					left: 28px;
					width: 24px;
					height: 24px;
				}

				&-clear{
					position: absolute;
					cursor: pointer;
					color: $color-grey-light;
					top: 14px;
					right: 10px;
					width: 32px;
					height: 32px;

					&:hover{
						color: $color-yellow;
					}

					&:active{
						color: $color-grey-light;
					}
				}

				&-input{
					height: 60px;
					line-height: 60px;
					width: 100%;
					box-sizing: border-box;
					padding: 0 60px;
					border-bottom: 1px solid $color-grey-white;

					&.is-filled,
					&:focus{
						border-bottom-color: $color-yellow;
						box-shadow: 0 1px 0 0 $color-yellow;
					}
				}
			}

			&-body{
				flex: 1 1 0;
				position: relative;
			}

			&-list{
				overflow: auto;
				height: 100%;
				position: relative;
			}


			&-inner{
				position: relative;
				height: 100%;
			}

			&-title{
				padding: 10px 20px;
				min-height: 60px;
				display: flex;
				align-items: center;
				background: rgba($color-yellow, 0.1);
				font-weight: 400;
				font-size: 14px;
				box-sizing: border-box;
			}

			&-item{
				padding: 10px 20px;
				display: flex;
				align-items: center;
				position: relative;
				cursor: pointer;


				&:hover{
					background: #F5F6F7;
				}

				&.is-active{
					background: rgba($color-yellow, 0.1);
				}

				&-label{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 0;
					color: $color-yellow;
					width: 16px;
					height: 16px;
				}

				&-image{
					width: 42px;
					height: 42px;
					min-width: 42px;
					border-radius: 50%;
					margin-right: 10px;
					background: no-repeat 50% 50%;
					background-size: cover;
				}

				&-info{
					min-width: 0;
					flex: 1 1 auto;
				}

				&-title{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 14px;
					font-weight: 400;
				}

				&-text{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					color: $color-grey-text;
				}

				&-date{
					margin-bottom: 1px;
				}

				&-more{
					text-align: right;
					color: $color-grey-text;
					font-weight: 400;
					margin-left: 10px;
					align-self: flex-start;
				}

				&-count{
					font-size: 12px;
					color: #fff;
					font-weight: 400;
					height: 20px;
					line-height: 20px;
					padding: 0 5px;
					border-radius: 20px;
					background: $color-yellow;
					display: inline-block;
					min-width: 20px;
					box-sizing: border-box;
					text-align: center;
				}

				&-point{
					width: 6px;
					height: 6px;
					border-radius: 50%;
					display: inline-block;
					background: $color-yellow;
				}

			}

			&-message{
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				padding: 20px;
				box-sizing: border-box;

				&-icon{

				}
			}
		}
	}
</style>