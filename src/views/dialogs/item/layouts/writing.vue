<template>
    <div class="dialog__writing">
        <div class="dialog__writing-status" v-if="isWriting">
            <div class="dialog__writing-status-icon">
                <img src="../../../../assets/svg/loading_dots.svg">
            </div>
            <div class="dialog__writing-status-text">
                {{ dialog.main.title }} печатает
            </div>
        </div>
        <div class="dialog__writing-field">
            <div class="dialog__writing-field-input">
                <div class="dialog__writing-field-scrollbar" v-scrollbar>
                    <div class="dialog__writing-field-inner">
                        <ckeditor v-model="message" :editor="editor.editor" :config="editor.config" />
                        <!-- <contenteditable tag="div" :contenteditable="true" v-model="message" @keydown="keydown" class="dialog__writing-field-textarea" /> -->
                    </div>
                </div>
            </div>
            <div class="dialog__writing-field-btn" :class="{'is-disabled': disableFileAdd }" @click="addFiles">
                <icon name="clip" ></icon>
            </div>
            <div class="dialog__writing-field-btn" :class="{'is-active': !disableSending, 'is-disabled': disableSending }" @click="sendMessage">
                <span v-if="loading">
                    <img src="../../../../assets/svg/loader-yellow.svg">
                </span>
                <icon name="send"  v-else ></icon>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

	export default {
		name: 'dialog-writing',

		components: {
            ckeditor: CKEditor.component
		},

		data(){
			return {
				loading: false,
				timer: null,
				isWriting: false,
				timerWriting: null,
				shiftKeyPressed: false,
                editor: {
                    // eslint-disable-next-line no-mixed-spaces-and-tabs
				    editor: ClassicEditor,
                    config: {
                        removePlugins: ['toolbar','blockToolbar'],
                        toolbar: [],
                        link: {
                            addTargetToExternalLinks: true
                        }
                    }
                }
			}
		},

		computed: {
			...mapState({
				options: state => state.dialogs.options,
				sending: state => state.dialogs.sending,
				dialog: state => state.dialogs.item,
				websocket: state => state.base.websocket,
				user: state => state.base.user,
			}),

			message: {
				get(){
					return this.sending.message
				},
				set(value){
					this.$store.commit('dialogs/SET_MESSAGE', value);
				}
			},

			disableFileAdd(){
				return this.sending.assets.length >= this.options.maxAssetLength;
			},

			disableSending(){
				return (!this.message.trim() && !this.sending.assets.length) || this.loading;
			},
		},

		beforeDestroy(){
			this.$eventHub.$off('ws-onmessage');
		},

		created(){
			this.$eventHub.$on('ws-onmessage', this.wsMessage);
		},

		methods: {

			wsMessage({data}){
				if ( data.action === "writing" && data.dialog_id.toString() === this.dialog.id.toString() ){
					this.isWriting = true;
					clearTimeout(this.timerWriting);
					this.timerWriting = setTimeout(()=>{
						this.isWriting = false;
					}, 3000)
				}
			},

			addFiles(){
				if ( !this.disableFileAdd) {
					this.$store.commit('dialogs/SET_UPLOAD_VIEW', true)
				}
			},

			keydown(e){
				if (!this.timer){
					this.userIsWriting();
				}
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.timer = null;
				}, 300);

				if ( !e.shiftKey && e.keyCode === 13){
					e.preventDefault();
					if ( !this.disableSending ) this.sendMessage();
				}
			},

			userIsWriting(){
				if (this.websocket){
					this.websocket.send(JSON.stringify({
						action: 'writing',
						dialog_id: this.dialog.id,
						user_id: this.user.id,
					}));
				}
			},

			sendMessage(){
				if ( !this.disableSending ){
					this.loading = true;
					this.$store.dispatch('dialogs/sendMessage')
						.then(()=>{
							this.$store.commit('dialogs/CLEAR_SENDING');
						})
						.finally(()=>{
							this.loading = false;
						})
					;
				}
			}
		},

	}
</script>

<style lang="scss">

	.dialog__writing{

		&-status{
			display: flex;
			align-items: center;
			margin-bottom: 12px;

			&-icon{
				width: 30px;
				margin-right: 10px;
				font-size: 0;
			}

			&-text{}

		}

		&-field{
			display: flex;
			align-items: flex-end;

			&-input{
				flex: 1 1 auto;
                max-width: calc(100% - 104px);
			}

			&-scrollbar{
				//background: #ECEDEF;
                background-color: #ECEDEF;
                border-radius: 21px;
                max-height: 180px;
                overflow: hidden!important;

                & * {
                    background: transparent!important;
                }
			}

			&-textarea{
				padding: 12px 20px 11px;
			}

			&-btn{
				width: 42px;
				min-width: 42px;
				height: 42px;
				border-radius: 50%;
				margin-left: 10px;
				background: #ECEDEF;
				cursor: pointer;
				color: $color-grey;

				svg{
					width: 100%;
					height: 100%;
				}

				&.is-active,
				&:hover{
					background: $color-yellow;
					color: #fff;
				}

				&.is-disabled{
					background: #ECEDEF;
					color: $color-grey;
					cursor: default;
				}

				.icon{
					width: 100%;
					height: 100%;
				}
			}

			&::v-deep .os-scrollbar-vertical{
				top: 15px;
				bottom: 15px;
			}
		}
	}
    .ck.ck-editor {
        &__top[role="presentation"] {
            display: none!important;
        }

        &__main > .ck-editor__editable {
            border: none!important;
            box-shadow: none!important;
        }
    }

</style>
