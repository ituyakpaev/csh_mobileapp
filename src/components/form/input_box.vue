<template>
    <label :class="{'is-error': this.error}" class="textinput__wrapper">
        <span :class="{'upped': this.focused || (this.valueMirror !== '' && this.valueMirror)}"
              class="textinput__label">
            {{ error || label }}
        </span>
        <div class="textinput__icon" v-if="icon" :class="icon" @click="$emit('click')">
            <icon :name="icon"/>
        </div>
        <input @keyup.enter="$emit('enter')" @focus="focus(true)" @blur="focus(false)" @change="change()"
               v-model="valueMirror" v-mask="mask"
               class="textinput__input" :name="name" :type="type | type" ref="input"  >

    </label>
</template>

<script>
export default { // orange, green, red
    name: "text-input",
    props: {
        label: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: ''
        },
        value: {
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
        },
        icon: {
            default: false
        },
        mask: {
            default: null
        }
    },
    data() {
        return {
            focused: false
        }
    },
    computed: {
        valueMirror: {
            get: function () {
                return this.value
            },
            set: function (val) {
                this.$emit('input', val)
                return val
            }
        }
    },
    filters: {
        type(val) {
            return val === 'date' ? 'text' : val
        }
    },
    methods: {
        focus(state) {
            this.focused = !!(state)
        },
        change() {
            this.$emit('change', this.valueMirror)
        }
    },
}
</script>

<style lang="scss" scoped> // Именуй классы подобным образом, это достаточно удобно для организации
// даже в компонентах, по типу инпута, которые, казалось бы, изолированы, не стоит принебрегать классами
// в App.vue засунул дефолтную стилизацию хтмл-тегов, которая стоит в проекте
.textinput {

    &__wrapper {
        display: flex;
        position: relative;
        padding: 13px 20px;
        width: 294px;
        border: $form-item-border;
        background-color: $inputBg;
        border-radius: 4px;
        font-family: 'Roboto';
        color: $color-black;
        font-size: $fFontSize;
        font-weight: 300;
        line-height: $fLineHeight;
        margin: 10px 20px 10px 0px;
        @include media(xs) {
            width: 243px;
        }

    }

    &__icon {
        cursor: pointer;
        height: 44px;
        width: 45px;
        position: absolute;
        right: -1px;
        top: -1px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        display: flex;
        align-items: center;

        & + .textinput__input {
            max-width: 227px;
        }

        svg {
            width: 44px;
            height: 36px;
            fill: #fff;
        }

        &.arrow-right {
            background-color: $color-yellow;
        }

        &.status-ok {
            background-color: $color-green;

            svg {
                height: 24px;
            }
        }

        &.close {
            background-color: $color-red;

            svg {

            }
        }
    }


    &__label {
        position: absolute;
        z-index: 5;
        top: 15px;
        left: 16px;
        padding: 0px 5px;
        color: $color-grey-light;
        background-color: #fff;
        font-family: 'Roboto';
        font-size: $fFontSize;
        transition: all 0.3s ease 0s;
    }

    &__input {
        width: 100%;

    }
}

.upped {
    position: absolute;
    z-index: 5;
    top: -8px;
    left: 16px;
    padding: 0px 5px;
    color: $color-grey-light;
    background-color: #fff;
    font-family: 'Roboto';
    font-size: $fOffsetY;

    &--long {
        top: 3px;
        left: 127px;
    }
}

.is-error {
    width: 294px;

    border: 1px solid $color-red;

    .textinput__label {
        color: $color-red;
        background-color: #fff;
        font-family: 'Roboto';
        font-size: $fOffsetY;
        font-weight: 300;
        z-index: 5;
        top: -8px;
        left: 16px;
    }

    @include media(xs) {
        width: 243px;
    }
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}

/* Для Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
