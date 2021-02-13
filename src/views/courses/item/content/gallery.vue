<template lang="pug">

	.course__case
		.course__title(v-if="content.title")
			span(v-html="content.title")
		.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
		.course__slider
			gallery(v-if="gallery.length", :id="`b-gallert-${_uid}`", :images="gallery", :index="imageOpened", @close="imageOpened = null")
			swiper(:options="optionsSlider", ref="catalogSlider")
				swiper-slide(v-for="(image, index) in content.images").course__slider-slide
					.course__slider-slide-inner(@click="imageOpened = index")
						.course__slider-slide-image(v-lazy:background-image="image.thumb || image.src")

				//.course__slider-slide-arrow.course__slider-slide-arrow_prev(v-if="gallery.length > 3", slot="button-prev"): icon(name="chevron-left")
				//.course__slider-slide-pagination(v-if="gallery.length > 3", slot="pagination")
				//.course__slider-slide-arrow.course__slider-slide-arrow_next(v-if="gallery.length > 3", slot="button-next"): icon(name="chevron-right")

</template>

<script>

	export default {

		props: {
			content: {
				type: Object
			}
		},

		data(){
			return {
				imageOpened: null,

				optionsSlider: {
					spaceBetween: 20,
					slidesPerView: 3,

					/*navigation: {
						prevEl: '.course__slider-slide-arrow_prev',
						nextEl: '.course__slider-slide-arrow_next',
					},

					breakpoints: {
						768: {
							spaceBetween: 10,
							slidesPerView: 'auto',
						},
					},
					pagination: {
						el: '.course__slider-slide-pagination',
						clickable: true,
					}*/
				}
			}
		},

		computed: {
			gallery(){
				return this.content.images.map(item => item.src);
			}
		},

		mounted(){

		},

		methods: {

		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">

</style>
