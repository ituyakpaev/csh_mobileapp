<template>
    <div class="video">
        <div class="video-name" v-if="name">{{ name }}</div>
        <div class="video-item" v-if="type === 'vimeo'">
            <vue-vimeo-player class="course__video-frame" :videoId="`${id}`" :video-url="`https://player.vimeo.com/video/${id}`"></vue-vimeo-player>
        </div>
        <div class="video-item" v-if="type === 'youtube'">
            <youtube class="course__video-frame" :video-id="id"></youtube>
        </div>
        <div class="video-item" v-else-if="poster" v-lazy:background-image="poster"></div>
    </div>
</template>

<script>
    import {vueVimeoPlayer} from 'vue-vimeo-player'

    export default {
        name: "videobox.vue",
        props: {
            type: {
                type: String,
                default: 'vimeo'
            },
            id: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            poster: {}
        },
        components: {
            vueVimeoPlayer
        }
    }
</script>

<style scoped lang="scss">
    .video{
        margin-bottom: 35px;

        &:last-child{
            margin-bottom: 0;
        }

        &-item{
            height: 0;
            position: relative;
            padding-top: (100% * 394 / 700);
            background: no-repeat 50% 50%;
            background-size: cover;
        }

        &-frame{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;

            iframe{
                width: 100% !important;
                height: 100% !important;
            }
        }

        &-name{
            font-size: 16px;
            font-weight: 400;
            color: $color-yellow;
            margin: 15px 0;

            &:first-child{
                margin-top: 0;
            }

            &:last-child{
                margin-bottom: 0;
            }
        }
    } // not using
</style>
