<template >
    <div class="menu">
        <div class="menu__inner">
            <div class="menu__head" @click="slideDown = !slideDown">
                <div class="menu__head-title">
                    Список уроков
                    <icon v-if="$store.state.base.breakpoint.mobile || $store.state.base.breakpoint.tablet" :name="slideDown ? 'chevron-up' : 'chevron-down'" width="30"/>
                </div>
            </div>
            <slide-up-down class="menu__wrap" :active="open" @open-end="onSlideEnd" @close-end="onSlideEnd">
                <menu-case v-for="(item, index) in menu" :key="index" :item="item" @onSlideEnd="onSlideEnd" />

                <router-link v-if='showCertificate' class="menu__case" :to="{ name: 'courses-item', params: { case: $route.params.case, item: 'certificate' }}" tag="div">
                    <div class="menu__item">
                        <div class="menu__item-title">
                            Сертификат
                        </div>
                    </div>
                </router-link>
                <router-link v-if='mega_certificate' class="menu__case" :to="{ name: 'courses-item', params: { case: $route.params.case, item: 'w_certificate' }}" tag="div">
                    <div class="menu__item">
                        <div class="menu__item-title">
                            Сертификат
                        </div>
                    </div>
                </router-link>
            </slide-up-down>
            <!--<slide-up-down class="menu__wrap" :active="open" @open-end="onSlideEnd" @close-end="onSlideEnd">
                <menu-case v-for="(item, index) in menu" :key="index" :item="item" @onSlideEnd="onSlideEnd" />

                <router-link v-if='showCertificate' class="menu__case" :to="{ name: 'courses-item', params: { case: $route.params.case, item: 'certificate' }}" tag="div">
                    <div class="menu__item">
                        <div class="menu__item-title">
                            Сертификат
                        </div>
                    </div>
                </router-link>
            </slide-up-down> -->
        </div>
    </div>
</template>

<script>

	import {mapState} from "vuex";

	import MenuCase from './menu-case'

	export default {

		components: {
			MenuCase
		},

		data(){
			return {
				slideDown: false
			}
		},

		computed: {
			...mapState({
				menu: state => state.course.menu,
                mega_certificate: state => state.course.certificate.mega_certificate ,
                certificate: state => state.course.certificate.state
			}),

            showCertificate() {
			    let homework_passed = this.menu.map(menu => {
                    return !menu.submenu || menu.submenu.map(submenu => submenu.done || !submenu.hasOwnProperty('done')).indexOf(false) === -1
                }).indexOf(false) === -1
                return homework_passed && this.certificate
            },

			open(){
				return this.$store.state.base.breakpoint.mobile || this.$store.state.base.breakpoint.tablet ? this.slideDown : true;
			}
		},

		watch: {

			'$route' (to, from) {
				if ( this.$store.state.base.breakpoint.mobile || this.$store.state.base.breakpoint.tablet){
					this.slideDown = false;
				}
			}
		},

		methods: {
			onSlideEnd(){
				this.$emit('onSlideEnd');
			},
		}

	}
</script>

<style scoped lang="scss">
	.menu{

		margin: 0 -20px;

		@include breakPoint($breakpoint-tablet){
			margin: 0;
			padding-bottom: 20px;
		}

		@include breakPoint($breakpoint-compact){

		}

		&__inner{
			box-shadow: $box-shadow;
			background: #fff;
		}

		&__head{
			height: 80px;
			padding: 0 20px;
			font-size: 24px;
			font-family: $font-title;
			font-weight: 400;
			border-bottom: 1px solid #ECECEC;
			display: flex;
			align-items: center;

			@include breakPoint(0, $breakpoint-compact){
				cursor: pointer;
			}

			&-title{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				.icon{
					position: absolute;
					color: $color-grey-light;
					top: 25px;
					right: 0;

					@include breakPoint($breakpoint-tablet){
						right: 15px;
					}
				}
			}
		}

	} // delete
</style>
