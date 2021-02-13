<template >
    <div class="content">
        <menu-item v-if="info && ($store.state.base.breakpoint.mobile || $store.state.base.breakpoint.tablet)" :item="info" />
        <content-item v-for="item in content" :content="item" :key="item.id" />
    </div>

</template>

<script>
	import {mapState} from "vuex";
	import MenuItem from './menu/menu-item'
	import ContentItem from './content'

	export default {
		components: {
			ContentItem,
			MenuItem
		},

		data(){
			return {

			}
		},

		computed: {
			...mapState({
				content: state => state.course.item.content,
				info: state => state.course.item.info,
			}),
		},

		mounted(){
			//this.loadContent()
		},

		methods: {

			loadContent(){
				this.$store.dispatch('course/getItem', {
					course_id: this.$route.params.case,
					id: this.$route.params.item,
					secret: this.$route.query.secret
				})
			}

		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">

	.content::v-deep{

		.menu__item{
			background: #fff!important;
			margin: -20px -20px 1px;
			box-shadow: $box-shadow;
			border-top: 2px solid $color-yellow;
			position: relative;
			z-index: 1;
			user-select: none;

			@include breakPoint($breakpoint-tablet){
				margin: -20px 0 20px;
				padding: 20px;
			}

		}
	}
</style>
