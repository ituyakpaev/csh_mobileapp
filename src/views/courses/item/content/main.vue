<template lang="pug">

	.course__case.course__case_main
		.course__case-anchor(v-if="content.anchor"): a(:id="content.anchor")
		.course__main
			.course__main-info
				.course__main-info-title {{ content.title }}
				.course__main-info-name {{ content.name }}
				.course__main-info-text
					p(v-if="content.start") #[b Старт:] {{ content.start }}

				.course__main-table(v-if="content.price_table")
					.course__main-table-col(v-for="col in content.price_table")
						.course__main-table-title {{ col.title }}
						.course__main-table-old_price {{ col.old_price }}
						.course__main-table-price {{ col.price }}

				.course__main-status(v-if="content.status_text")
					.course__main-status-value(v-if="content.status_text")
						| {{ content.status_text }}
						span.course__main-status-icon(v-if="content.status", :class="`course__main-status-icon_${content.status}`"): icon(name="status-ok")

				.course__main-payment(v-if="content.payment_info")

					.course__main-payment-text(v-html="content.payment_info.html")

					.course__main-payment-btns
						//-btn-item(yellow, v-if="content.payment_info.show_installment_btn") Оплатить обучение
						//-btn-item(yellow, v-if="content.payment_info.show_payment_btn") Оплатить рассрочку
						//-btn-item(v-if="content.payment_info.show_payment_btn") Способы оплаты


				.course__main-payment-btns(v-if="content.buttons && content.buttons.length")
					btn-item(v-for="(button, index) in content.buttons", :yellow="button.color === 'yellow'", :href="button.href", :key="index") {{ button.text }}



			.course__main-image(v-lazy:background-image="content.image")
			.course__main-error(v-if="content.error")
				.course__main-error-icon: icon(name="attention", width="36")
				.course__main-error-info
					.course__main-error-title {{ content.error.title }}
					.course__main-error-text {{ content.error.text }}
				.course__main-error-link
					router-link(to="/support")
						| Тех.поддержка
						icon(name="link-away" width="16")

</template>

<script>

	export default {

		props: {
			content: {
				type: Object
			}
		},

		data(){
			return {

			}
		},

		computed: {

		},

		mounted(){

		},

		methods: {

		},

		watch: {

		},
	}
</script>

<style scoped lang="scss">

</style>