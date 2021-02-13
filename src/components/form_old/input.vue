<template lang="pug">
	m-form-item.m-form-input(:class="classList", :value="value")
		input(
			:type='type',
			:disabled="disabled",
			autocomplete="off",
			v-on="{...$listeners, input:()=>{}, focus:onFocus, blur:onBlur}",
			v-model.trim="model",
			:readonly="readonly",
			:placeholder="placeholder"
		)

</template>

<script>
	import Mixin from './mixin'
	import MFormItem from './item'
	import Inputmask from "inputmask";

	export default {
		name: 'm-form-input',
		mixins: [Mixin],
		components: {MFormItem},

		props: {
			type: {
				type: String,
				default: 'text'
			},
			readonly: {
				type: Boolean,
				default: false
			},
			mask: {
				type: String,
				default: null
			},
			placeholder: {
				type: String,
				default: null
			}
		},

		mounted(){
			this.$nextTick(()=>{
				if ( this.mask ){
					new Inputmask({
						mask: this.mask,
						showMaskOnHover: false,
						onincomplete: (e)=>{
							e.target.value = '';
							this.model = '';
						}
					}).mask(this.$el.querySelectorAll('input')[0]);
				}
			})
		},

		methods:{

			onFocus(){
				this.isFocused = true;
				this.$emit('focus');
			},

			onBlur(){
				this.isFocused = false;
				this.$emit('blur');
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../form/styles";

	input{
		box-sizing: border-box;
		width: 100%;
		padding: $input-paddings;
		border: $input-border;
		border-radius: $input-border-radius;
		transition: $m-form-transition;

		.m-form-status-error &{
			border-color: $m-form-error-color;
		}

		.m-form-status-focus &{
			border-color: $m-form-active-color;
		}
	}

	.m-form-input{

	}


</style>
