<template lang="pug">
	label
		span(v-html="text || ' '", :class="{'clean': !model}")
		input(
			type="text",
			v-on="{...$listeners, input:()=>{}}",
			v-model="model",
			ref="input"
			)
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: '',
			},
			placeholder: {
				type: String,
				default: '',
			},
		},

		computed:{
			model:{
				get(){
					return this.value;
				},
				set(value){
					this.$emit('input', value)
				}
			},

			text(){
				return this.placeholder && !this.model ? this.placeholder : this.model;
			}
		},

		methods:{
			focus(){
				this.$refs.input.focus()
			}
		}
	}
</script>

<style scoped lang="scss">

	label{
		position: relative;
		display: inline-block;
		overflow: hidden;
	}

	input{
		font: inherit;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: transparent!important;
		caret-color: black!important;
	}

	span{
		font: inherit!important;
		pointer-events: none!important;
		display: block!important;
		white-space: pre;
		min-width: 10px;

		&.clean{
			opacity: 0.5;
		}
	}


</style>