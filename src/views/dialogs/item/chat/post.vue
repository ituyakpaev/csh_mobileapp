<template lang="pug">
	.dialog__post(:id="`post_${post.id}`", :class="{'dialog__post_my' : isSelf, 'dialog__post_loading' : loading, 'dialog__post_unread' : post.unread}")
		.dialog__post-inner
			//gallery(v-if="gallery.length", :id="`b-gallert-${_uid}`", :images="gallery", :index="imageOpened", @close="imageOpened = null")
			.dialog__post-image(v-lazy:background-image="post.author.image", v-if="!isSelf")
				.is-online(v-if="post.author.online")
			.dialog__post-body
				.dialog__post-author
					span(v-if="!isSelf") {{ post.author.name }}&nbsp;
					span {{ post.date | time }}


				template(v-if="post.removed")
					.dialog__post-removed
						| Сообщение удалено.&nbsp;
						span.link(v-if="isSelf", @click="restorePost") Восстановить

				template(v-else)
					.dialog__post-message(v-if="post.message || post.reply")
						.dialog__post-bubble
							.dialog__post-reply(v-if="post.reply", @click="$emit('gotoReply', post.reply.id)")
								.dialog__post-reply-auth {{ post.reply.author }} {{ post.reply.date | time }}
								.dialog__post-reply-text {{ post.reply.text | nohtml }}
							.dialog__post-text(:inner-html.prop="post.message | enableLinks ")

					.dialog__post-assets
						.dialog__post-assets-image(v-if="images.length")
							.dialog__post-assets-image-item(v-for="(asset, index) in images", @click="openGallery(index)")
								//a(:href="asset.url")
								img(v-lazy="$domain + asset.thumb")
								.dialog__post-assets-image-download(:content="'Скачать оригинал'", v-tooltip="{delay:[100, 0], theme: 'user', placement: 'top'}", @click.stop)
									a(target="_blank", :href="asset.url", :download="`${post.id}-${asset.id}`")
										icon(name="download")
								.dialog__post-assets-image-name {{ asset.weight }}

						.dialog__post-assets-file(v-if="files.length")
							.dialog__post-assets-file-item(v-for="asset in files")
								.dialog__post-assets-file-icon(:class="`dialog__post-img-file-icon_${asset.type}`")
									icon(:name="`asset-${asset.type}`", width="30")
								.dialog__post-assets-file-info
									.dialog__post-assets-file-name: a(:href="asset.url", download) {{ asset.name }}
									.dialog__post-assets-file-weight {{ asset.weight }}


				.dialog__post-settings(v-if="!post.removed")
					tooltip(
						interactive,
						placement="bottom-start",
						theme="menu",
						:distance="20",
						animation="fade",
						trigger="click",
						arrow,
						ref="tooltip"
					)
						template(slot="trigger")
							icon(name="dots")
						template
							.link(@click="addToReply") Цитировать сообщение
							.link(v-if="isSelf && !post.removed", @click="removePost") Удалить сообщение
							.link(v-if="!isSelf && !post.removed && !post.unread", @click="markUnread") Отметить как непрочитанное



</template>

<script>


	export default {
		name: 'dialog-post',

		props: {
			post: {
				type: Object
			}
		},

		data(){
			return {
				imageOpened: null,
				loading: false,
			}
		},

		computed: {
			isSelf(){
				return Number(this.post.author.id) === this.$store.state.base.user.id;
			},

			images(){
				return this.post.assets && this.post.assets.length ? this.post.assets.filter( item => item.thumb) : []
			},

			files(){
				return this.post.assets && this.post.assets.length ? this.post.assets.filter( item => !item.thumb) : []
			},

			gallery(){
				return this.images.map( item => item.url );
			}
		},

		mounted(){

		},

		methods: {

			removePost(){
				if ( this.loading ) return false;
				this.$refs.tooltip.tip.hide();
				this.loading = true;
				this.$store.dispatch('dialogs/removePost', this.post.id)
					.finally(()=>{
						this.loading = false;
					});
			},
			restorePost(){
				if ( this.loading ) return false;

				this.loading = true;
				this.$store.dispatch('dialogs/restorePost', this.post.id)
					.finally(()=>{
						this.loading = false;
					});

			},
			markUnread(){
				if ( this.loading ) return false;
				this.$refs.tooltip.tip.hide();
				this.loading = true;
				this.$store.dispatch('dialogs/unreadPost', this.post.id)
					.finally(()=>{
						this.loading = false;
					});
			},
			addToReply(){

				this.$refs.tooltip.tip.hide();

				this.$store.commit('dialogs/ADD_REPLY', {
					id: this.post.id,
					title: `${this.isSelf ? 'Вы' : this.post.author.name}, ${this.$options.filters.time(this.post.date)}`,
					text: this.post.message || 'Сообщение'
				})

			},
			openGallery(index){
				this.$store.commit('base/SET_GALLERY', {gallery: this.gallery, open: index })
            },
            enableLinks(value){
			    console.log(this.$options.filters.enableLinks(value));
                return this.$options.filters.enableLinks(value)
            }

		},

	}
</script>

<style lang="scss">

	.dialog__post{

		&:hover{
			.dialog__post-settings{
				opacity: 1;
			}
		}

		&_my{
		}

		&_unread{
			background: rgba($color-yellow, 0.08);
		}

		&_loading{
			opacity: 0.5;
			pointer-events: none;
		}

		&-inner{
			display: flex;
			padding: 10px 50px 10px 20px;

			@include breakPoint($breakpoint-tablet){
				max-width: 70%;
			}

			.dialog__post_my &{
				text-align: right;
				padding-left: 80px;
				margin-left: auto;
			}
		}

		&-image{
			width: 42px;
			height: 42px;
			min-width: 42px;
			border-radius: 50%;
			background: $color-grey-white no-repeat 50% 50%;
			background-size: cover!important;
			margin-right: 13px;
			position: relative;

			.is-online{
				position: absolute;
				background: $color-green;
				width: 4px;
				height: 4px;
				border-radius: 50%;
				border: 2px solid #fff;
				right: 2px;
				bottom: 2px;
			}
		}

		&-body{
			min-width: 0;
			position: relative;

			.dialog__post_my &{
				margin-left: auto;
			}
		}

		&-author{
			color: $color-grey-text;
			margin-bottom: 7px;
		}

		&-removed{
			.link{
				color: $color-yellow;
				user-select: none;
			}
		}

		&-reply{
			border-left: 2px solid $color-yellow;
			padding-left: 8px;
			margin-bottom: 10px;
			cursor: pointer;

			&-auth{
				color: $color-grey-text;
			}

			&-text{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		&-message{

		}

		&-bubble{
			background: #FFF5DB;
			border-radius: 0 10px 10px 10px;
			padding: 12px 15px;
			box-sizing: border-box;
			text-align: left;

			.dialog__post_my &{
				border-radius: 10px 0 10px 10px;
				background: #ECEDEF;
			}
		}

        &-text {
            word-wrap: break-word!important;

            a {
                text-decoration: underline;
                color: $color-yellow;
            }

            & * {
                word-wrap: break-word!important;
            }
        }

		&-assets{

			&-image{
				display: flex;
				flex-wrap: wrap;


				.dialog__post_my &{
					flex-direction: row-reverse;
				}

				&-item{
					height: 110px;
					max-width: 200px;
					overflow: hidden;
					position: relative;
					margin: 10px 10px 0 0;
					cursor: pointer;

					.dialog__post_my &{
						margin: 10px 0 0 10px;
					}

					@include breakPoint($breakpoint-desktop){
						height: 150px;
						width: 250px;
					}

					img{
						display: block;
						height: 100%;
					}

					&:hover{
						.dialog__post-assets-image-download{
							opacity: 1;
						}
					}
				}
				&-download{
					position: absolute;
					right: 10px;
					top: 10px;
					max-width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 5px;
					background: rgba(#fff, .8);
					border-radius: 2px;
					opacity: 0;

					.icon{
						display: block;
					}
				}
				&-name{
					position: absolute;
					right: 10px;
					bottom: 10px;
					max-width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 5px;
					background: rgba(#fff, .8);
					border-radius: 2px;
				}
			}

			&-file{

				&-item{
					display: flex;
					margin-top: 10px;

					.dialog__post_my &{
						flex-direction: row-reverse;
					}
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

					.dialog__post_my &{
						margin-right: 0;
						margin-left: 10px;
					}

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
					a{
						&:hover{
							color: $color-yellow;
						}
					}
				}

				&-weight{
					font-size: 12px;
					color: $color-grey-text;
				}
			}
		}

		&-settings{
			position: absolute;
			top: 25px;
			right: -30px;
			color: $color-grey-light;
			width: 24px;
			height: 24px;
			opacity: 0;
			transition: opacity .3s ease;
			cursor: pointer;

			&:hover{
				color: $color-yellow;
			}
		}
	}

</style>
