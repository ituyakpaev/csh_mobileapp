<template lang="pug">
	.dialog__upload
		.dialog__upload-drag(
			@dragenter="onDragenter",
			@dragover="onDragover",
			@dragleave="onDragleave",
			@drop="onDrop",
			:class="{'dialog__upload-drag_active': dragActive}")
		.dialog__upload-inner
			.dialog__upload-close(@click="closeUpload"): icon(name="close", width="40")
			.dialog__upload-icon: icon(name="photo" width="46")
			.dialog__upload-title(v-if="$store.state.base.breakpoint.mobile || $store.state.base.breakpoint.tablet") Добавить изображения или файлы
			.dialog__upload-title(v-else) Перетащите сюда изображение
			.dialog__upload-btn
				label(:for="`file_${_uid}`")
					btn-item(yellow, v-if="$store.state.base.breakpoint.mobile || $store.state.base.breakpoint.tablet") Выбрать файлы
					btn-item(yellow v-else) Выбрать на компьютере
			.dialog__upload-text
				p Вы можете прикрепить к сообщению не более {{filesLimit}} файлов
				p Вы можете загрузить документ в формате JPG, GIF или PNG, объем файла не должен превышать 20 МБ

			input.dialog__upload-input(
				type='file',
				:accept="accept()",
				:id="`file_${_uid}`",
				multiple,
				@change="onChange"
				)

</template>

<script>

	import {mapState} from 'vuex'

	export default {
		name: 'dialog-upload',

		data(){
			return {
				dragActive: false,
				isError: false,
			}
		},

		computed: {
			...mapState({
				options: state => state.dialogs.options,
				assets: state => state.dialogs.sending.assets,
			}),

			filesLimit(){
				return this.assets.left >= this.options.maxAssetLength;
			}
		},

		mounted(){

		},

		methods: {

			closeUpload(){
				this.$store.commit('dialogs/SET_UPLOAD_VIEW', false)
			},

			onChange(e){
				this.onDrop(e);
			},

			accept(){
				let accept = '';
				for (let i = 0; i < this.options.accept.length; i++){
					accept += `${i > 0 ? ', ' : ''}.${this.options.accept[i]}`
				}
				return accept || false;
			},

			onDragenter(){
				this.dragActive = true;
			},

			onDragover(){
				this.dragActive = true;
			},

			onDragleave(){
				this.dragActive = false;
			},

			onDrop(e){
				this.isError = false;
				this.dragActive = false;
				let collect = e.dataTransfer || e.target;
				this.addFiles(collect.files);
				this.closeUpload()
			},

			addFiles(files){
				([...files]).forEach((file, i)=>{
					this.uploadFile(file, i);
				});
			},

			uploadFile(file){

				let extension = file.name.match(/\w+/ig).pop().toLowerCase(),
					matched = this.options.accept && this.options.accept.length ? this.options.accept.length && this.options.accept.map(exp => exp.toLowerCase() ).indexOf(extension) >= 0 : true,
					size = file.size,
					isImage = ['jpg','jpeg', 'png','gif','webp','pdf'].map(exp => exp.toLowerCase() ).indexOf(extension) >= 0;


				/*if ( !matched){
					if ( !this.isError ) {
						this.isError = true;
						this.$store.commit('dialogs/OPEN_INFO_POPUP', {
							title: 'Ошибка',
							message: 'Недопустимый формат файла.',
						});
					}
				} */
				if ( isImage && size > 20000000) {
					this.$store.commit('dialogs/OPEN_INFO_POPUP', {
						title: 'Ошибка',
						message: `Изображение «${this.$options.filters.crop(file.name, 30)}» превышает максимально допустимый размер.<br>Размер изображения не должен превышать 20Мб.`,
					});
				} else if ( size > 100000000) {
					this.$store.commit('dialogs/OPEN_INFO_POPUP', {
						title: 'Ошибка',
						message: `Файл «${this.$options.filters.crop(file.name, 30)}» превышает максимально допустимый размер.<br>Размер файла не должен превышать 100Мб.`,
					});
				} else if ( this.filesLimit ){
					if ( !this.isError ) {
						this.isError = true;
						this.$store.commit('dialogs/OPEN_INFO_POPUP', {
							title: 'Ошибка',
							message: `Вы можете прикрепить к сообщению не более ${this.filesLimit} файлов.`,
						});
					}
				} else if (matched && !this.filesLimit ) {

					this.$store.dispatch('dialogs/fileUpload', file);

				}
			}
		},
	}
</script>

<style scoped lang="scss">

	.dialog__upload{
		text-align: center;
		height: 100%;
		box-sizing: border-box;
		padding: 20px;
		position: relative;

		&-inner{
			height: 100%;
			border: 2px dashed $color-yellow;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 10px 20px;
			box-sizing: border-box;
			position: relative;
		}

		&-close{
			width: 40px;
			height: 40px;
			position: absolute;
			top: -2px;
			right: -2px;
			background: $color-yellow;
			color: #fff;
			font-size: 0;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&-icon{
			font-size: 0;
			margin-bottom: 10px;
		}
		&-title{
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 25px;
		}
		&-btn{
			margin-bottom: 30px;
		}
		&-text{
			color: $color-grey-text;

			p{
				margin: 5px 0;
			}
		}

		&-input{
			position: absolute;
			opacity: 0;
			pointer-events: none;
		}

		&-drag{
			position: absolute;
			top: 20px;
			left: 20px;
			right: 20px;
			bottom: 20px;
			background: rgba($color-yellow, .1);
			opacity: 0;

			&_active{
				opacity: 1;
				border: 2px solid $color-yellow;
				z-index: 1;
			}

			.on-drag &{
				opacity: 1;
				z-index: 1;
			}
		}
	}

</style>