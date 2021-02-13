<template>
    <div class="course__case">
        <div class="course__title" v-if="content.title" :class="{'link' : slide}" @click="click"><span v-html="content.title"></span>
            <icon class="arrow" :name="open ? 'chevron-up' : 'chevron-down'" v-if="slide"></icon>
        </div>
        <div class="course__case-anchor" v-if="content.anchor"><a :id="content.anchor"></a></div>
        <slide-up-down :active="open">
            <div class="course__text">
                <div class="course__file">
                    <document v-for="file in content.files" :key='file.title' :color="file.color" :href="file.url"
                              :type="file.type" :title="file.title" :weight="file.weight" class="course__file-item" />
                </div>
            </div>
        </slide-up-down>
    </div>
</template>

<script>
    import document from "../../../../components/functional/document";

	export default {

	    components: {
	        document
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
