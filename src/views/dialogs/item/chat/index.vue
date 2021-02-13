<template lang="pug">
	.dialog__chat(v-scrollchat="opts", ref="chat")
		.dialog__chat-inner
			.loader(v-if="loading")
			.dialog__chat-content(v-else-if="posts.length")
				.dialog__chat-loadmore(:class="{'is-active': loadingMore}")
				template(v-for='(post, index) in posts')
					.dialog__chat-date(v-if="index === 0"): span {{ post.date | date }}
					.dialog__chat-date(v-else-if="compareDate(posts[index - 1].date, post.date)"): span {{ post.date | date }}
					post-item(:post="post", :key="post.id", @gotoReply="gotoReply")
			.dialog__chat-content(v-else)



</template>

<script>

	import {mapState} from 'vuex'

	import PostItem from './post';

	export default {
		name: 'dialog-chat',

		props: {
			loading: {
				type: Boolean,
				default: false
			}
		},

		components: {
			PostItem
		},

		data(){
			return {
				loadingMore: false,
				opts: {
					callbacks: {
						onScroll: (e)=>{
							//console.info(this.chat.scroll().ratio.y)

							if ( !this.done && this.chat.scroll().ratio.y <= 0.01 ) {
								this.loadMore();
							}
						},
					}
				}
			}
		},

		computed: {
			...mapState({
				posts: state => state.dialogs.item.chat,
				done: state => state.dialogs.item.done
			}),

			chat(){
				return this.$refs.chat && this.$refs.chat.scrollbar ? this.$refs.chat.scrollbar : {};
			}

		},

		created(){

		},

		methods: {
			loadMore(){
				if ( !this.loadingMore ) {
					this.loadingMore = true;
					this.$store.dispatch('dialogs/getMore', this.id)
						.finally(()=>{
							this.loadingMore = false;
						});
				}
			},

			compareDate(past, today){
				return !this.$moment(past).isSame(this.$moment(today), 'day');
			},

			gotoReply(id){
				const post = document.getElementById(`post_${id}`);
				console.info(id, post);
				if ( post ) {
					this.chat.scroll(document.getElementById(`post_${id}`), 300);
				} else {
					this.chat.scroll({ y : 0 }, 300);
				}
			},

			newPostAdded(){
				setTimeout(()=>{
					const data = this.chat.scroll();
					const diff = data.max.y - data.position.y;

					if ( diff < 500 ){
						this.chat.scroll({ y : '100%' }, 300);
					}
				}, 100)

			}
		},
	}
</script>

<style scoped lang="scss">

	.dialog__chat{
		height: 100%;
		position: relative;


		&-inner{
			padding: 20px 0;
			box-sizing: border-box;
			display: flex;
			min-height: 100%;
			flex-direction: column;
			justify-content: flex-end;
		}

		&-date{
			text-align: center;
			height: 1px;
			background: $color-grey-white;
			color: $color-grey-text;
			position: relative;
			margin: 20px 0;

			span{
				background: #fff;
				position: absolute;
				top: 50%;
				padding: 0 20px;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		&-loadmore{
			height: 50px;
			background: url("../../../../assets/svg/loader-yellow.svg") no-repeat 50% 50%;
			background-size: 50px;
			opacity: 0;

			&.is-active{
				opacity: 1;
			}
		}
	}

</style>
