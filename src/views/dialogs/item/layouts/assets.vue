<template lang="pug">
	.dialog__assets
		.dialog__assets-reply(v-if="reply")
			.dialog__assets-reply-item
				.dialog__assets-reply-title {{ reply.title }}
				.dialog__assets-reply-text {{ reply.text | nohtml }}
				icon.dialog__assets-reply-remove(name="close", width="30", @click="removeReply")
		.dialog__assets-images
			.dialog__assets-images-item(v-for="asset in images", :key="asset.id")
				img(v-lazy="asset.thumb")
				icon.dialog__assets-images-remove(name="close", width="30", @click="removeAsset(asset.id)")
		.dialog__assets-files
			.dialog__assets-files-item(v-for="asset in files", :key="asset.id")
				.dialog__assets-files-icon(:class="`dialog__assets-files-icon_${asset.type}`")
					icon(:name="`asset-${asset.type}`", width="30")
				.dialog__assets-files-info
					.dialog__assets-files-name {{ asset.name }}
					.dialog__assets-files-weight {{ asset.weight }}
				icon.dialog__assets-files-remove(name="close", width="30", @click="removeAsset(asset.id)")
		.dialog__assets-upload
			.dialog__assets-upload-item(v-for="asset in upload", :key="asset.localId")
				.dialog__assets-upload-progress: span(:style="{width: asset.progress + '%'}")
				.dialog__assets-upload-name {{ asset.name }}



</template>

<script>

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-assets',

		components: {

		},

		data(){
			return {

			}
		},

		computed: {
			...mapState({
				assets: state => state.dialogs.sending.assets,
				reply: state => state.dialogs.sending.reply,
			}),

			images(){
				return this.assets.filter( item => item.id && item.thumb)
			},

			files(){
				return this.assets.filter( item => item.id && !item.thumb)
			},

			upload(){
				return this.assets.filter( item => item.localId)
			}
		},

		mounted(){

		},

		methods: {
			removeAsset(id){
				this.$store.commit('dialogs/REMOVE_ASSET', id)
			},

			removeReply(){
				this.$store.commit('dialogs/ADD_REPLY', null)
			}
		},

	}
</script>

<style scoped lang="scss">

	.dialog__assets{
		margin-top: 10px;

		&-images{
			display: flex;
			flex-wrap: wrap;

			&-item{
				height: 100px;
				margin: 0 10px 10px 0;
				position: relative;
				max-width: 200px;
				overflow: hidden;

				img{
					display: block;
					height: 100%;
				}
			}

			&-remove{
				color: $color-grey-light;
				cursor: pointer;
				position: absolute;
				top: 0;
				right: 0;
				user-select: none;

				&:hover{
					color: $color-yellow;
				}
			}
		}

		&-files{
			&-item{
				display: flex;
				margin-top: 10px;
			}

			&-icon{
				width: 30px;
				min-width: 30px;
				height: 30px;
				border-radius: 2px;
				margin-right: 10px;
				color: #fff;
				user-select: none;
				background: $color-grey-white;

				&_video{
					background: $color-grey;
				}

				&_document{
					background: $color-yellow;
				}

				&_archive{
					background: $color-green;
				}
			}

			&-info{
				flex: 1 1 auto;
				min-width: 0;
				margin: -4px 0;
			}

			&-name{
			}

			&-weight{
				font-size: 12px;
				color: $color-grey-text;
			}

			&-remove{
				color: $color-grey-light;
				cursor: pointer;
				align-self: center;
				user-select: none;

				&:hover{
					color: $color-yellow;
				}
			}
		}

		&-upload{
			&-item{
				margin-top: 10px;
				display: flex;
				align-items: center;
			}

			&-progress{
				width: 120px;
				border-radius: 10px;
				height: 8px;
				background: $color-grey-white;
				margin-right: 20px;

				span{
					display: block;
					height: 100%;
					border-radius: 10px;
					background: $color-yellow;
				}
			}

			&-name{
				min-width: 50%;
				flex: 1 1 auto;


				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

			}
		}

		&-reply{

			&-item{
				margin-top: 10px;
				border-left: 2px solid $color-yellow;
				padding-left: 8px;
				margin-bottom: 10px;
				position: relative;
				padding-right: 50px;
				min-height: 38px;
			}

			&-title{
				color: $color-grey-text;
			}

			&-text{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			&-remove{
				color: $color-grey-light;
				cursor: pointer;
				position: absolute;
				top: 5px;
				right: 0;

				&:hover{
					color: $color-yellow;
				}
			}
		}
	}

</style>