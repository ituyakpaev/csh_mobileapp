<template>
    <!-- Принимает label - Текст лейбла
        Принимает isError  - Наличие ошибки -->
    <label  :class="{'is-error': this.isError}" class="radiobuttons" >
        <input class="radiobuttons__item" :type='type' :tabindex="tabIndex ? 'on' : 'off'"
               v-model="valueMirror" :value='val' :name="name"
               :checked="{'checked': valueMirror === true || valueMirror === val}">
        <span class="radiobuttons__radio"></span>
		<span class="radiobuttons__text">
            {{ label }}
        </span>
    </label>

</template>

<script>
    export default {
        name: "checkbox",
        props: {
            label: {
                type: String,
                required: true
            },
            isError: {
                type: Boolean,
                default: false
            },
            value: {
                required: true
            },
            type: {
                type: String,
                default: 'checkbox'
            },
            name: String,
            val: String,
            tabIndex: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            valueMirror: {
                get: function() {
                    return this.value
                },
                set: function(val) {
                    this.$emit('input', val)
                    return val
                }
            }
        }
    }
</script>

<style lang="scss" > // label занимает 100% ширины, не очень удобно.
   .radiobuttons{
	display: inline-block;
	position: relative;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 22px;
	user-select: none;
	&__text{
		margin-left: 4px;
		color: $color-grey-light;
		font-family: 'Roboto';
		font-size: 12px;
		font-weight: 300;
	}
	&__item{
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	&__radio{
		display: inline-block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid #ffb600;
		position: relative;
		top:3px;
			&::before{
				content: '';
				width: 8px;
				height: 8px;
				display: block;
				background-color: #ffb600;
				position: absolute;
				top: 50%;
				right: 50%;
				border-radius: 50%;
				transform: translate(50%,-50%);
				opacity: 0;
				transition: .2s;
			}
		}
	}
	.radiobuttons input:checked ~ .radiobuttons__radio:before {
		display: block;
		opacity: 1;
	}

</style>
