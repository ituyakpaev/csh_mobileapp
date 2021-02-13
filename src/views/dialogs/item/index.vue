<template lang="pug">
	.dialog__wrapper(v-if="!loading && posts === null")
		.dialog__item
			.dialog__item-welcome
				dialog-error
	.dialog__wrapper(v-else)
		dialog-upload(v-if="uploadView")
		.dialog__item(v-show="!uploadView")
			.dialog__item-welcome(v-if="!loading && welcome")
				dialog-welcome
			.dialog__item-head(v-if="loading || !welcome")
				dialog-head(:loading="loading")
			.dialog__item-body(v-if="loading || !welcome")
				dialog-chat(:loading="loading", ref="chat")
			.dialog__item-foot
				.dialog__item-foot-scroll(v-scrollbar)
					.dialog__item-foot-inner
						dialog-writing
						dialog-assets

</template>

<script>

	import DialogWriting from './layouts/writing'
	import DialogAssets from './layouts/assets'
	import DialogUpload from './layouts/upload'
	import DialogHead from './layouts/head'
	import DialogWelcome from './layouts/welcome'
	import DialogError from './layouts/error'
	import DialogChat from './chat'

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-item',

		props: {
			id: {
				type: [Number, String],
				default: 0
			}
		},

		components: {
			DialogWelcome,
			DialogError,
			DialogWriting,
			DialogAssets,
			DialogUpload,
			DialogHead,
			DialogChat
		},

		data(){
			return {
				loading: false
			}
		},

		computed: {
			...mapState({
				uploadView: state => state.dialogs.uploadView,
				posts: state => state.dialogs.item.chat,
				websocket: state => state.base.websocket,
				welcome: state => state.dialogs.item.welcome,
				user: state => state.base.user,
			}),
		},

		beforeDestroy(){
			this.$eventHub.$off('ws-onmessage');
		},

		created(){
			this.$eventHub.$on('ws-onmessage', this.wsMessage);
		},

		mounted(){
			this.loadItem();
		},

		methods: {
			loadItem(){
				if (this.id){
					this.loading = true;
					this.$store.dispatch('dialogs/getItem', this.id)
						.finally(()=>{
							this.loading = false;
						});
				}
			},

			wsMessage({data}){

				if ( data.action === "new_message" && data.dialog_id.toString() === this.id.toString() ){

					const post = {
						author: data.author,
						date: data.date,
						id: data.id,
						message: data.message,
						assets: data.assets,
						reply: data.reply
					};

					this.$store.commit('dialogs/APPEND_POST', post);
					if (this.$refs.chat) this.$refs.chat.newPostAdded();

					this.websocket.send(JSON.stringify({
						action: 'message_readed',
						message_id: data.id,
						user_id: this.user.id,
					}));
				}
			},
		},

		watch: {
			id() {
				this.loadItem();
			}
		},

	}
</script>

<style scoped lang="scss">

	.dialog__wrapper{
		height: 100%;
	}

	.dialog__item{

		display: flex;
		flex-direction: column;
		height: 100%;

		&-head{
			border-bottom: 1px solid $color-grey-white;
			height: 60px;
			box-sizing: border-box;
		}

		&-welcome{
			flex: 1 1 0;
		}

		&-body{
			flex: 1 1 0;
			z-index: 3;
		}

		&-foot{

			&-scroll{
				max-height: 50vh;
				overflow: auto;
			}

			&-inner{
				padding: 10px 20px 20px;

				@include breakPoint($breakpoint-tablet){
					padding: 10px 60px 20px;
				}
			}
		}
	}

</style>
