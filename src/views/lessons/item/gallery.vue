<template>
    <div class="lesson-gallery" v-show="imgs.length > 0">
        <swiper class="lesson-gallery__vertical" :options="swiper">
            <swiper-slide v-for="(img, index) in imgs" :key="img" class="lesson-gallery__slide"
                          @click="selectImage(index)"
                          :class="{'lesson-gallery__slide--is-active': img === (selectedImageData || selectedImage)}">
                <div @click="selectImage(index)">
                    <img :src="img" alt/>
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination lesson-gallery__pag"></div>
        <div class="lesson-gallery__main">
            <img :src="selectedImageData || selectedImage" alt/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "gallery",
        props: {
            imgs: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                selectedImageData: null,
                swiper: {
                    direction: 'horizontal',
                    slidesPerView: 'auto', // was 1
                    spaceBetween: 10,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                    breakpoints: {
                        951: {
                            direction: 'vertical',
                            slidesPerView: 3,
                            spaceBetween: 20,
                        }
                    }
                }
            }
        },
        computed: {
            selectedImage: {
                get() {
                    return this.imgs[0]
                },
                set(val) {
                    this.selectedImageData = val
                }
            }
        },
        methods: {
            selectImage(index) {
                this.selectedImage = this.imgs[index]
            }
        }
    }
</script>

<style lang='scss'>
    .lesson-gallery {
        display: flex;
        position: relative;

				@include mediaLessons(md) {
            flex-direction: column;
            width: 100%;
        }
        &__main {
            @include mediaLessons(md) {
                display: none;
            }

            img {
                width: 451px;
                height: 451px;
                object-fit: cover;
                @include mediaLessons(wd) {
                    width: 358px;
                    height: 358px;
                }
                @include mediaLessons(lg) {
                    width: 256px;
                    height: 256px;
                }

            }
        }

        &__vertical {
            width: 137px;
            height: 451px;
            margin-right: 20px;
            @include mediaLessons(wd) {
                width: 106px;
                height: 358px;
            }
            @include mediaLessons(lg) {
                width: 72px;
                height: 256px;
            }
            @include mediaLessons(md) {
                height: 100%;
								width: calc(100vw - 40px);
								padding: 0;
                margin: 0;
            }
            @include mediaLessons(sm) {
                height: 100%;
                width: calc(100vw - 40px); // Надо вот так. Контейнер э
                padding: 0;
                margin: 0;
            }

            img { // useless
                @include mediaLessons(md) {
                    width: 412px;
                    height: 412px;
                    object-fit: cover;
                }
                @include mediaLessons(sm) {
                    width: 305px;
                    height: 305px;
                }
            }


        }

        &__slide {
            position: relative;
            cursor: pointer;

            @include mediaLessons(md) {
                width: 421px;
                height: 421px;
            }
            @include mediaLessons(sm) {
                width: 305px;
                height: 305px;
            }

            img {
                width: 137px;
                height: 137px;
                object-fit: cover;
                @include mediaLessons(wd) {
                    width: 106px;
                    height: 106px;
                }
                @include mediaLessons(lg) {
                    width: 72px;
                    height: 72px;
                }
                @include mediaLessons(md) {
                    width: 421px;
                    height: 421px;
                }
                @include mediaLessons(sm) {
                    width: 305px;
                    height: 305px;
                }
            }
        }

        &__slide--is-active {
            &::after {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 2px solid #ffb600;

                @include mediaLessons(md) {
                    display: none;
                }
            }
        }

        &__pag {
            bottom: 0;
            text-align: center;
            left: auto;
            right: 0;
            z-index: 1;
            padding: 15px 0 0;
            display: none;
						@include mediaLessons (md){
							display: block;
						}
        }
    }

    .swiper-pagination-bullet {
        cursor: pointer;
        width: 14px;
        height: 14px;
        margin: 7px;
        display: inline-block;
        border: 1px solid #ffb600;
        border-radius: 50%;
        background: #ffb600;
        box-sizing: border-box;
        @include mediaLessons(sm) {
            width: 10px;
            height: 10px;
        }
    }

    .swiper-pagination-bullet-active {
        width: 14px;
        height: 14px;
        margin: 7px;
        background: transparent;
        @include mediaLessons(sm) {
            width: 10px;
            height: 10px;
        }

    }

    .lesson-gallery__vertical {
        @include mediaLessons(md) {
            overflow: visible;
        }
    }
</style>
