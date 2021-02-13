<template lang="pug">
	div(style="position:relative")
		.course__hold(v-if="content.hold")
			.course__hold-pop
				.course__hold-icon: icon(name="lock")
				.course__hold-title Доступ будет открыт после оплаты
				.course__hold-text Постоянный доступ к уроку в личном кабинете#[br]с любого устройства
		div(:is="`content-${content.type}`", :content="content.data")


</template>

<script>

	import ContentMain from './main'
	import ContentHtml from './html'
	import ContentFiles from './files'
	import ContentLessons from './lessons'
	import ContentBonus from './bonus'
	import ContentVideo from './video'
	import ContentOffer from './offer'
	import ContentGallery from './gallery'

	export default {

		name: 'content-item',

		props: {
			content: {
				type: Object
			}
		},

		components: {
			ContentHtml,
			ContentFiles,
			ContentLessons,
			ContentBonus,
			ContentVideo,
			ContentMain,
			ContentOffer,
			ContentGallery,
		},

	}
</script>

