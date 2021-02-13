<template lang="pug">
	.menu__case
		menu-item(:item="item", @click="onClick")
		.menu__case-arrow(v-if="item.submenu")
			icon(:name="open ? 'chevron-up' : 'chevron-down'", width="20")

		slide-up-down.menu__submenu(:active="open", v-if="item.submenu", @open-end="onEnd", @close-end="onEnd", ref="slideUpDown")
			menu-item(v-for="(subitem, index) in item.submenu", :key="index", :item="subitem")

</template>

<script>

	import MenuItem from './menu-item'

	export default {

		name: 'menu-case',

		props: ['item'],

		components: {
			MenuItem
		},

		data(){
			return {
				open: false
			}
		},

		computed: {

		},

		mounted(){
			this.$nextTick(()=>{
				if ( this.item.open ) this.open = true;

				if ( this.$store.state.base.breakpoint.mobile || this.$store.state.base.breakpoint.tablet){
					if ( this.$refs.slideUpDown ){
						setTimeout(()=>{
							this.$refs.slideUpDown.style.height = '';
						}, 100)
					}
				}
			})
		},

		methods: {
			onClick(){
				this.open = !this.open;
				//this.$emit('onSlideEnd');
			},
			onEnd(){
				//window.dispatchEvent(new Event('resize'));
				//setTimeout(()=>{
				// 	window.dispatchEvent(new Event('scroll'));
				// }, 10)

				this.$emit('onSlideEnd');
			},

			checkActiveCourse(){
				const active = this.item.submenu && this.item.submenu.find(item => item.active);

				if ( active ){
					this.open = true;
				}
			}
		},


	}
</script>

<style lang="scss">

	.menu{

		&__case{
			border-bottom: 1px solid #ECECEC;
			align-items: center;
			position: relative;

			&-arrow{
				position: absolute;
				top: 20px;
				right: 15px;
				color: $color-grey-light;

				/*@include breakPoint($breakpoint-compact){
					top: 10px;
				}*/
			}
		}

		&__submenu{
			border-top: 2px solid $color-yellow;
		}
	}
</style>
