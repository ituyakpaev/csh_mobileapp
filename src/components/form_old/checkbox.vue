<template lang="pug">
	m-form-item.m-form-checkbox(:class="classList", :value="value")
		input(
			type='checkbox',
			:disabled="disabled",
			v-on="{...$listeners, input:()=>{}}",
			:id="`form_old-checkbox_${_uid}`",
			:value="id",
			v-model="model",
		)
		label(:for="`form_old-checkbox_${_uid}`").m-form-checkbox__marker
		label(:for="`form_old-checkbox_${_uid}`", v-if="$slots.default").m-form-checkbox__label
			slot

</template>

<script>
	import Mixin from './mixin'
	import MFormItem from './item'

	export default {
		name: 'm-form-checkbox',
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
			& ~ .m-form-checkbox__marker{
				border: $checkbox-border-checked;
				background: $checkbox-background-checked;
				background-size: cover;
			}
		}
	}

	.m-form-checkbox{
		display: flex;

		&__marker{
			display: block;
			box-sizing: border-box;
			width: $checkbox-width;
			min-width: $checkbox-width;
			height: $checkbox-height;
			border: $checkbox-border;
			border-radius: $checkbox-border-radius;
			cursor: pointer;
			background: $checkbox-background;
			background-size: cover;
			transition: $m-form-transition;

			.m-form-status-error &{
				border-color: $m-form-error-color;
			}
		}

		&__label{
			display: block;
			cursor: pointer;
			font: $checkbox-label-font;
			padding: $checkbox-label-paddings;
		}
	}

</style>
