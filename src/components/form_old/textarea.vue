<template lang="pug">
	m-form-item.m-form-textarea(:class="classList", :value="value")
		.m-form-textarea-wrap(v-scrollbar)
			.m-form-textarea-inner
				contenteditable(
					tag="div"
					:contenteditable="!disabled && !readonly",
					autocomplete="off",
					:noHTML="true",
					v-model.trim="model",
					:placeholder="placeholder",
					ref="textarea"
				)
				.m-form-textarea-placeholder(v-if="placeholder", v-show="!isFocused && !value") {{ placeholder }}
</template>

<script>
	import Mixin from './mixin'
	import MFormItem from './item'
	import Contenteditable from 'vue-contenteditable/src/contenteditable.vue'

	export default {
		name: 'm-form-textarea',
		mixins: [Mixin],
		components: {MFormItem, Contenteditable},

		props: {
			readonly: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: null
			}
		},

		beforeDestroy() {
			this.$refs.textarea.$el.removeEventListener('focus', this.onFocus);
			this.$refs.textarea.$el.removeEventListener('blur', this.onBlur);
		},

		mounted(){
			this.$nextTick(()=>{
				this.$refs.textarea.$el.addEventListener('focus', this.onFocus);
				this.$refs.textarea.$el.addEventListener('blur', this.onBlur);
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

	.m-form-textarea{

		&-wrap{
			border: $input-border;
			border-radius: $input-border-radius;
			max-height: 150px;
			transition: $m-form-transition;

			.m-form-status-error &{
				border-color: $m-form-error-color;
			}

			.m-form-status-focus &{
				border-color: $m-form-active-color;
			}
		}

		&-inner{
			box-sizing: border-box;
			padding: $input-paddings;
		}

		&-placeholder{
			opacity: .5;
			position: absolute;
			top: 0;
			left: 0;
			padding: $input-paddings;
			right: 0;
			pointer-events: none;
		}
	}


</style>
