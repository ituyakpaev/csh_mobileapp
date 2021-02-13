<template lang="pug">
	m-form-item.m-form-radio(:class="classList", :value="value")
		input(
			type='radio',
			:disabled="disabled",
			v-on="{...$listeners, input:()=>{}}",
			:id="`form_old-radio_${_uid}`",
			:value="id",
			v-model="model",
		)
		label(:for="`form_old-radio_${_uid}`").m-form-radio__marker
		label(:for="`form_old-radio_${_uid}`", v-if="$slots.default").m-form-radio__label
			slot

</template>

<script>
	import Mixin from './mixin'
	import MFormItem from './item'

	export default {
		name: 'm-form-radio',
		mixins: [Mixin],
		components: {MFormItem},

		props: {
			id: {
				type: [String, Number],
				default: null
			}
		},

	}
</script>

<style scoped lang="scss">
	@import "../form/styles";

	input{
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;

		&:checked{
			& ~ .m-form-radio__marker{
				border: $radio-border-checked;
				background: $radio-background-checked;
				background-size: cover;
			}
		}
	}

	.m-form-radio{
		display: flex;

		&__marker{
			display: block;
			box-sizing: border-box;
			width: $radio-width;
			min-width: $radio-width;
			height: $radio-height;
			border: $radio-border;
			border-radius: $radio-border-radius;
			cursor: pointer;
			background: $radio-background;
			background-size: cover;
			transition: $m-form-transition;

			.m-form-status-error &{
				border-color: $m-form-error-color;
			}
		}

		&__label{
			display: block;
			cursor: pointer;
			font: $radio-label-font;
			padding: $radio-label-paddings;
		}
	}

</style>
