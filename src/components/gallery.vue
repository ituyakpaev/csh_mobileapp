<template lang="pug">
	.blueimp-gallery.blueimp-gallery-controls(:id="id", :class="{'blueimp-gallery-carousel': carousel}")
		.slides
		.title
		.description
		.arrow.prev
			icon(name="arrow-left")
		.arrow.next
			icon(name="arrow-right")
		.close(v-if="!carousel"): icon(name="cross-remove")
		a.play-pause(v-if="carousel")
		ol.indicator(v-else)


</template>

<script>
	import 'blueimp-gallery/js/blueimp-gallery-fullscreen.js';
	import 'blueimp-gallery/js/blueimp-gallery-video.js';
	import 'blueimp-gallery/js/blueimp-gallery-youtube.js';
	import blueimp from 'blueimp-gallery/js/blueimp-gallery.js';

	export default {
		props: {
			images: {
				type: Array,
				default() {
					return [];
				},
			},

			options: {
				type: Object,
				default() {
					return {};
				},
			},

			carousel: {
				type: Boolean,
				default: false,
			},

			index: {
				type: Number,
			},

			id: {
				type: String,
				default: 'blueimp-gallery',
			},
		},

		data() {
			return {
				instance: null,
			};
		},

		watch: {
			index(value) {
				if (this.carousel) {
					return;
				}

				if (value !== null) {
					this.open(value);
				} else {
					if (this.instance) {
						this.instance.close();
					}

					this.$emit('close');
				}
			},
		},

		mounted() {
			if (this.carousel) {
				this.open();
			}
		},

		destroyed() {
			if (this.instance !== null) {
				this.instance.destroyEventListeners();
				this.instance.close();
				this.instance = null;
			}
		},

		methods: {
			open(index = 0) {
				const instance = typeof blueimp.Gallery !== 'undefined' ? blueimp.Gallery : blueimp;

				const options = Object.assign({
					toggleControlsOnReturn: false,
					toggleControlsOnSlideClick: false,
					closeOnSlideClick: false,
					carousel: this.carousel,
					container: `#${this.id}`,
					index,
					onopen: () => this.$emit('onopen'),
					onopened: () => {
						$('body').addClass('is-gallery-open');
						this.$emit('onopened');
					},
					onslide: this.onSlideCustom,
					onslideend: (index, slide) => this.$emit('onslideend', { index, slide }),
					onslidecomplete: (index, slide) => this.$emit('onslidecomplete', { index, slide }),
					onclose: () => this.$emit('close'),
					onclosed: () => {
						$('body').removeClass('is-gallery-open');
						this.$emit('onclosed')
					},
				}, this.options);

				if (this.carousel) {
					options.container = this.$el;
				}

				this.instance = instance(this.images, options);
			},
			onSlideCustom(index, slide) {
				this.$emit('onslide', { index, slide });

				const image = this.images[index];
				if (image !== undefined) {
					const text = image.description;
					const node = this.instance.container.find('.description');
					if (text) {
						node.empty();
						node[0].appendChild(document.createTextNode(text));
					}
				}
			},
		},
	};
</script>

<style scoped lang="scss">

	$colorMain: $color-yellow;

	.blueimp-gallery{

	}

	.blueimp-gallery::v-deep .description {
		position: absolute;
		top: 30px;
		left: 15px;
		color: #fff;
		display: none;
	}
	.blueimp-gallery-controls::v-deep .description {
		display: block;
	}

	.close{
		position: absolute;
		top: 15px;
		right: 15px;
		height: 40px;
		width: 40px;
		background: $color-yellow;
		border-radius: 50%;
		padding: 0;
		margin: 0;
		opacity: 1;

		.icon{
			width: 100%;
			height: 100%;
		}

	}

	.arrow{
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		margin-top: -20px;
		border: 1px solid $colorMain;
		border-radius: 50%;
		box-sizing: border-box;
		cursor: pointer;
		background: transparent;
		transition: all .3s ease;
		opacity: 1;
		background: $color-yellow;


		&:hover{
			background: rgba($colorMain, .5);
		}

		&.swiper-button-disabled{
			opacity: .5;
			background: transparent!important;
			cursor: default;
		}

		&_prev{
			left: 0;
		}
		&_next{
			right: 0;
		}

		svg{
			width: 100%;
			height: 100%;
		}
	}

</style>
