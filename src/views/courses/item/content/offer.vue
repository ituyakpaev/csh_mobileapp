<template lang="pug">
	div
		.course__case
			.course__title(v-if="content.title", :class="{'link' : slide}", @click="click")
				span(v-html="content.title")
				icon(:name="open ? 'chevron-up' : 'chevron-down'", v-if="slide").arrow
			.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
			slide-up-down(:active="open")
				.course__text
					.course__offer
						.course__offer-files
							.course__offer-file(v-for="(file, index) in content.files", :class="{'loading': loading[index]}")
								input(type="file", :id="`file_inputloader_${index}`", accept="image/x-png,image/gif,image/jpeg,application/pdf", @change="addFile($event, index)")
								.course__offer-file-image
									.course__offer-file-status
										span.course__main-status-icon(
											v-if="status[index]",
											:class="`course__main-status-icon_${status[index]}`")
											icon(:name="status[index] === 'success' ? 'status-ok' : 'close'")
									ratio-box(:ratio="1.5")
										.course__offer-file-image-pic(v-lazy:background-image="offerStore.thumb[index] || '/testing/img/offer-doc-2.jpg'")
								.course__offer-file-name(:class="{'c-red' : status[index] === 'error'}") {{ file.title }}  {{ message[index] ? '(' + message[index] + ')' : ''}}
								.course__offer-file-control
									label.course__offer-file-control-add.link.c-yellow(v-if="offerStore.thumb[index]", :for="`file_inputloader_${index}`") Загрузить другой файл
									label.course__offer-file-control-add.link.c-yellow(v-else, :for="`file_inputloader_${index}`") Загрузить файл
									.course__offer-file-control-clear.link.c-grey(v-if="offerStore.thumb[index]", @click="removeFile(index)") Удалить

		.course__case
			.course__offer-confirm
				div
					m-form-checkbox(v-model="confirm"): span(v-html="content.confirm_text")

				div(v-if="content.status === 'in_moderate' || files_sent")
					btn-item(@click="sendFiles", hold, :loading="loading_submit") Документы на модерации
				div(v-else-if="content.status === 'need_confirm'")
					btn-item(yellow, @click="sendFiles", :disabled="disabled", :loading="loading_submit") Отправить документы
				div(v-if="content.status === 'need_correct'")
					btn-item(yellow, @click="sendFiles", :disabled="disabled", :loading="loading_submit") Отправить исправленные документы


</template>

<script>
	import {mapState} from 'vuex';
	import BtnItem from  "../../../../components/btn-item";

	export default {
		components: {BtnItem},
		props: {
			content: {
				type: Object
			}
		},

		data(){
			return {
				open: this.content.collapse === undefined || !this.content.collapse,

				loading_submit: false,
				files_sent: false,

				status: [],
				message: [],
				loading: [],
			}
		},

		computed: {

			...mapState({
				offerStore: state => state.course.offer,
			}),

			confirm: {
				get(){
					return this.offerStore.confirm;
				},
				set(value){
					this.$store.commit('course/SET_OFFER_CONFIRM', value)
				}
			},

			slide(){
				return this.content.collapse !== undefined;
			},

			disabled(){
				return !this.confirm || this.offerStore.id.indexOf(undefined) >= 0;
			}
		},

		created(){
			this.setFilesState();
		},

		methods: {

			setFilesState(){
				this.confirm = this.content.confirmed;
				this.content.files.forEach((item, index)=>{
					this.$store.commit('course/SET_OFFER_THUMB', {
						index,
						value: item.id ? item.thumb ? item.thumb : `../../../../img/offer-doc-2.jpg` : undefined
					});
					this.$store.commit('course/SET_OFFER_ID', {
						index,
						value: item.status === 'success' ? item.id : undefined
					});

					this.status[index] = item.status;
					this.message[index] = item.message;
					this.loading[index] = false;
				})
			},

			removeFile(index){
				this.status[index] = undefined;
				this.message[index] = undefined;
				this.$store.commit('course/SET_OFFER_THUMB', {
					index,
					value: undefined
				})
				this.$store.commit('course/SET_OFFER_ID', {
					index,
					value: undefined
				})
			},

			addFile(e, index){
				this.$set(this.loading, index, true);

				this.status[index] = undefined;
				this.message[index] = undefined;

				let file = e.target.files[0],
					size = file.size
				;

				if ( size > 20000000) {
					this.$set(this.loading, index, false);
					// this.$store.commit('dialogs/OPEN_INFO_POPUP', {
					// 	title: 'Ошибка',
					// 	message: `Изображение «${this.$options.filters.crop(file.name, 30)}» превышает максимально допустимый размер.<br>Размер изображения не должен превышать 20Мб.`,
					// });
					alert(`Изображение «${this.$options.filters.crop(file.name, 30)}» превышает максимально допустимый размер.\nРазмер изображения не должен превышать 20Мб.`)
				} else {
					this.$store.dispatch('course/fileUpload', {file, index})
						.finally(()=>{
							this.$set(this.loading, index, false);
						});
				}
			},

			sendFiles(){
				this.loading_submit = true;
				this.$store.dispatch('course/sendOffer')
					.then(()=>{
						this.files_sent = true;
					})
					.finally(()=>{
						this.loading_submit = false;
					});
			},

			click(){
				if (this.slide) this.open = !this.open;
			}
		},
	}
</script>

<style scoped lang="scss">
    .default-doc {
        background-image: url("/public/img/offer-doc-2.jpg");
    }
</style>
