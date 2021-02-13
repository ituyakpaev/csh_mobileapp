<template>
    <div class="btn__wrapper">
        <button class="btn" @click="$emit('click')" :class="[color.toLocaleLowerCase(), {'performing': performing}]"
                :style="{'background-image': color === 'violet' ? `url(${ basePath }/img/svg/lessons/watch.svg)` : ''}">
            <span>
                <slot>
                   {{ title }}
               </slot>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: "button_box",
    props: {
        color: {
            type: String,
            default: 'Yellow'
        },
        title: String,
        buttonClass: String,
        performing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            url: process.env.BASE_URL
        }
    }
}
</script>

<style
    lang="scss"> // у компонента кнопки есть входной параметр - Color, если он равен Yellow или Grey, то на батон ставятся соответствующие классы,
// см описание выше в темплейте
// делай стиль именно от этих классов, и также добавь класс самой кнопки, не ссылайся просто на батон
// при наведенеии на кнопку сделай цвет чуть светлее
.btn {
    color: #fff;
    padding: 13px 20px;
    border-radius: 20px;
    font-family: $font-main;
    font-size: $fFontSize;
    font-weight: 400;
    transition: all 0.3s ease 0s;
    margin-right: 10px;
    margin-top: 20px;
    @include media(xs) {
        padding: 13px 15px;
    }

    &.yellow {
        background-color: $color-yellow;

        &:hover {
            background-color: #ffc840;
        }
    }

    &.grey {
        background-color: $color-grey;

        &:hover {
            background-color: #75808b;
        }
    }

    &.violet {
        margin-top: 8px;
        background-color: #663250;
        padding: 8px 10px 8px 42px;
        background-repeat: no-repeat;
        background-position: 10px center;

        &:hover {
            background-color: #7e4673;
        }

        @include media(xs) {
            margin: 8px 0px 0px 0px;
            font-size: 13px;
        }
    }

    &.performing {
        position: relative;
        color: transparent;

        &:after {
            content: "";
            display: block;
            width: 20px;
            height: 20px;
            border: 3px solid #fff;
            border-right-color: transparent;
            border-radius: 50%;
            position: absolute;
            overflow: auto;
            margin: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            animation: performing 1.5s ease-in-out infinite;
        }
    }
}


@keyframes performing {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

@include media(xs) {
    .calc__btn {
        button {
            width: 100%;
        }
    }
}
</style>
