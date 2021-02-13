<template>
    <div style="display: flex; flex-direction: column">
        <label class="radiobuttons" v-for="row in rows" :key="row.value || row.title">
            <input class="radiobuttons__item" type='radio' :value='row.value'
                   @input="valueMirror = row.value"
                   v-model="valueMirror" >
            <span class="radiobuttons__radio"></span>
            <span class="radiobuttons__text">
                {{ row.title }}
            </span>
        </label>
    </div>

</template>

<script>
export default {
    name: "checkbox",
    props: {
        rows: {
            type: Array,
            default: () => []
        },
        value: {
            required: true
        },
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

