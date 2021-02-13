<template>
    <div class="course__case">
        <div class="course__title" v-if="content.title" :class="{'link' : slide}" @click="click">
            <span v-html="content.title"></span>
            <icon class="arrow" :name="open ? 'chevron-up' : 'chevron-down'" v-if="slide"></icon>
        </div>
        <div class="course__case-anchor" v-if="content.anchor"><a :id="content.anchor"></a></div>
        <slide-up-down :active="open">
            <div class="course__text">
                <div class="course__html" v-if="content.html" v-html="content.html"></div>
                <videobox v-for="video in content.videos" :key='video.vimeoId ? video.vimeoId : video.youtubeId' :type="video.vimeoId ? 'vimeo' : 'youtube'"
                       :id='video.vimeoId ? video.vimeoId : video.youtubeId' :poster="video.poster" :name="video.name" />
            </div>
        </slide-up-down>
    </div>
</template>

<script>
    import videobox from "../../../../components/functional/videobox";

	export default {

		components: {
            videobox
		},

		props: {
			content: {
				type: Object
			}
		},

		data(){
			return {
				open: this.content.collapse === undefined || !this.content.collapse,
			}
		},

		computed: {
			slide(){
				return this.content.collapse !== undefined;
			}
		},

		mounted(){

		},

		methods: {
			click(){
				if (this.slide) this.open = !this.open;
			}
		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">


</style>
