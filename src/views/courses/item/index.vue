<template>
    <div class="course">
        <div class="inner">
            <div class="course__inner">
                <div class="course__aside">
                    <affix class="course__aside-sticky" relative-element-selector="#course-content" :enabled="!($store.state.base.breakpoint.mobile || $store.state.base.breakpoint.tablet)" :scrollAffix="true" :offset="affix_options.offset" ref="aside">
                        <aside-menu @onSlideEnd="onSlideEnd"/>
                    </affix>
                    <!--<Affix class="course__aside-sticky" v-bind="affix" style="position: fixed">
                        <aside-menu />
                    </Affix>-->
                </div>
                <div class="course__content" id="course-content">
                    <div class="course__content-inner" style="position: relative">
                            <div class="loader" v-if="loading" />
                            <certificate v-else-if="$route.params.item === 'certificate'"/>
                            <wide_certificate v-else-if="$route.params.item === 'w_certificate'" />
                            <course-content v-else-if="$route.params.item" />
                            <main-content v-else />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

	import AsideMenu from './menu/index'
	import MainContent from './menu/main-content'
	import CourseContent from './course-content'
	import Affix from '../../../components/affix'
    import certificate from './certificate'
    import wide_certificate from './certificate/homeworks'
	import {mapState} from "vuex"


	export default {
	    name: 'course',

		components: {
			AsideMenu,
			MainContent,
            Affix,
			CourseContent,
            certificate,
            wide_certificate
		},

		data(){
			return {
				loading: false,
                affix_options: {
                    'relative-element-selector': "#course-content",
					zIndex: 1,
					offset: {
						top: this.localNav ? 135 : 100,
						bottom: 0
					}
				}
			}
		},

		computed: {
			...mapState({
				localNav: state => !!state.base.localNav.courses
			}),
		},

		created(){
			this.$store.dispatch('course/getLocalNav');
			this.loadCase();

			this.loadItem();
		},
		methods: {

			onSlideEnd(){
			    setTimeout(()=>{
				    console.log(this.$refs)
					this.$refs.aside.init();
				}, 1000);
			},

			loadCase(){
				if ( this.$route.params.case ){
					this.loading = true;
					this.$store.dispatch('course/getInfo', this.$route.params.case)
						.then(res=>{
						    console.log(res)
							if(res.home){
								for (let i = 0; i < res.menu.length; i++){
									if ( res.menu[i].submenu && res.menu[i].submenu.length) {
										for (let j = 0; j < res.menu[i].submenu.length; j++){
											if ( res.home === res.menu[i].submenu[j].id){
                                                this.$router.push({
                                                    name: 'courses-item',
                                                    params: {
                                                        case: this.$route.params.case,
                                                        item: res.menu[i].submenu[j].id
                                                    },
                                                    query: {
                                                        secret: res.menu[i].submenu[j].secret
                                                    }
                                                });
												break;
											}
										}
									}
								}
							}
						})
						.finally(()=>{
							this.loading = false;
						});

				}
			},

			loadItem(){
				if (this.$route.params.item && this.$route.params.item !== 'certificate') {
					this.$store.dispatch('course/getItem', {
						course_id: this.$route.params.case,
						id: this.$route.params.item,
						secret: this.$route.query.secret
					});
				}
			},

		},

		watch: {
			'$route' (to, from) {
				if (to.params.case && to.params.case !== from.params.case ) this.loadCase();
				if (to.params.item && to.params.case !== from.params.item ) this.loadItem();
			},

			localNav(val){
				this.affix_options.offset.top = val ? 135 : 100
			}
		},
	}
</script>

<style scoped lang="scss">

	.course{

		&__inner{
			@include breakPoint($breakpoint-compact){
				margin: 0 (-$grid-gutter / 2);
				display: flex;
			}
		}

		&__aside{
            position: relative;

			@include breakPoint($breakpoint-tablet){
				margin-top: 20px;
			}

			@include breakPoint($breakpoint-compact){
				width: (3 * 100% / 10);
				box-sizing: border-box;
				padding: 0 ($grid-gutter / 2);
			}

			&-sticky {

				@include breakPoint(0, $breakpoint-compact){
					top: 0!important;
				}

				@include breakPoint($breakpoint-compact){
					width: 238px;
					box-sizing: border-box;
				}

				@include breakPoint($breakpoint-desktop){
					width: 322px;
					box-sizing: border-box;
				}

				@include breakPoint($breakpoint-hd){
					width: 451px;
					box-sizing: border-box;
				}
			}
		}

		&__content{
			@include breakPoint($breakpoint-compact){
				width: (7 * 100% / 10);
				box-sizing: border-box;
				padding: 0 ($grid-gutter / 2);
			}
		}
	}

</style>
