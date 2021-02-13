<template>
    <div class="inner">
        <div class="calc white-wrapper">
            <h2 class="title">Калькулятор перерасчета ингредиентов при выпечке</h2>
            <p class="calc__text">Как перерасчитать количество ингредиентов в зависимости от формы.</p>
            <div class="calc__in-recipe">
                <p class="calc__title">1. В рецепте используется</p>
                <div class="calc__form">
                    <checkbox label="Круглая форма" class="calc__check" v-model="inRecipe.type" type="radio" name="in-recipe-type" val="round"/>
                    <checkbox label="Прямоугольная форма" class="calc__check" v-model="inRecipe.type" type="radio" name="in-recipe-type" val="square"/>
                </div>
                <div class="calc__row">
                    <input_box v-for="(field,id) in inRecipe[inRecipe.type]" type='number' :key="id" :label="field.label" v-model.trim="field.value" :isError="field.isError" @enter="count()"/>
                </div>
            </div>
            <div class="">
                <p class="calc__title">2. У меня имеется</p>
                <div class="calc__form">
                    <checkbox label="Круглая форма" class="calc__check" v-model="inUse.type" type="radio" name="in-use-type" val="round"/>
                    <checkbox label="Прямоугольная форма" class="calc__check" v-model="inUse.type" type="radio" name="in-use-type" val="square"/>
                </div>
                <div class="calc__row">
                    <input_box v-for="(field,id) in inUse[inUse.type]" :key="id" type='number' :label="field.label" v-model.trim="field.value" :isError="field.isError" @enter="count()"/>
                </div>
            </div>
            <div class="calc__buttons">
                <button_box title="Рассчитать" color="Yellow" class="calc__btn" @click="count"/> <!-- Кнопка вызывает расчет -->
                <button_box title="Очистить форму" color="Grey" class="calc__btn" @click="clear"/> <!-- Очищает поля ввода, на одном макете она есть, на  другом нет -->
            </div>
        </div>
        <div v-show="result.performed" class="result"> <!-- блок показывается только если расчет произведен -->
            <p class="result__number">КОЭФФИЦИЕНТ = {{ result.value }}</p>
            <p class="result__explain">Для того, чтобы мой бисквит был {{ result.toBe }} и такой же высоты как в исходном рецепте, мне следует вес всех ингредиентов умножить на <span>{{ result.value }}</span> </p>
        </div>
        <div v-show="!result.performed" class="result"> <!-- блок показывается только если расчет произведен -->
            <p class="result__number">Введите данные для рассчета</p>
        </div>

    </div>
</template>

<script>

    export default {
        name: "calculator1",
        data() {
            return {
                inRecipe: {
                    type: 'round',
                    round: {
                        diameter: {
                            label: 'Диаметром, см',
                            value: '',
                            isError: false,
                            errorText: null
                        }
                    },
                    square: {
                        length: {
                            label: 'Длиной, см',
                            value: '',
                            isError: false,
                            errorText: null
                        },
                        width: {
                            label: 'Шириной, см',
                            value: '',
                            isError: false,
                            errorText: null
                        }
                    }
                },
                inUse: {
                    type: 'round',
                    round: {
                        diameter: {
                            label: 'Диаметром, см',
                            value: '',
                            isError: false,
                            errorText: null
                        }
                    },
                    square: {
                        length: {
                            label: 'Длиной, см',
                            value: '',
                            isError: false,
                            errorText: null
                        },
                        width: {
                            label: 'Шириной, см',
                            value: '',
                            isError: false,
                            errorText: null
                        }
                    }
                },
                result: {
                    value: 0,
                    performed: false,
                    toBe: ''
                }
            }
        },
        methods: {
            count() {
                let inUseArea, inRecipeArea, err = false

                let getNumber = (val = 0) => {
                    return Number(String(val).replace(/[^,\d]/g, '') || 0)
                }

                let validateValue = val => {
                    if (val === '' || getNumber(val) === 0) {
                        err = true
                        return false
                    } else {
                        return true
                    }
                }

                let getArea = type => {
                    let area = 0;

                    if (this[type].type === 'round') {
                        let diametr = getNumber(this[type].round.diameter.value || 0)

                        this[type].round.diameter.isError = !validateValue(this[type].round.diameter.value)

                        this[type].round.diameter.value = this[type].round.diameter.isError ? '' : String(diametr)

                        area = Math.PI * Math.pow((diametr / 2), 2)
                    } else if (this[type].type === 'square') {
                        let length = getNumber(this[type].square.length.value || 0)
                        let width = getNumber(this[type].square.width.value || 0)

                        this[type].square.length.isError = !validateValue(this[type].square.length.value)
                        this[type].square.width.isError = !validateValue(this[type].square.width.value)

                        this[type].square.length.value = this[type].square.length.isError ? '' : String(length)
                        this[type].square.width.value = this[type].square.width.isError ? '' : String(width)

                        area = length * width
                    }

                    return area || 0
                }

                inUseArea = getArea('inUse')
                inRecipeArea = getArea('inRecipe')

                if (!err) {
                    this.result.value = (inUseArea / inRecipeArea).toFixed(2)
                    this.result.performed = true
                    if (this.inUse.type === 'round') {
                        this.result.toBe = `диаметром ${ this.inUse.round.diameter.value || 0 } см`
                    } else {
                        this.result.toBe =  `площадью ${ this.inUse.square.length.value || 0  } на ${ this.inUse.square.width.value || 0 } см`
                    }
                }
            },

            clear() {
                ['inUse', 'inRecipe'].map(type => {
                    ['round', 'square'].map(form => {
                        Object.keys(this[type][form]).map(field => {
                            this[type][form][field].value = ''
                        })
                    })
                })
                this.result.performed = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .white-wrapper{
        background-color: #fff;
        padding: 30px 40px;
        margin-top: 20px;
        @include media (xs){
            margin: 0px;
            padding: 25px 20px;
        }
    }
    .calc{
        &__text{
            color: $color-grey-light;
            font-size: 13px;
            font-weight: 300;
            line-height: 18px;

        }
        &__in-recipe{

        }
        &__title{
            color: $color-black;
            font-size: 16px;
            font-weight: 500;
            margin-top: 18px;
        }
        &__buttons{
            display: flex;
            @include media (xs){
                flex-direction: column;
            }
        }
        &__row{
            display: flex;
            @include media (xs){
                flex-direction: column;
            }
        }
        &__check{
            margin: 0px 30px 0px 0px;
        }
        &__form{
            @include media (xs){
                display: flex;
                flex-direction: column;
            }
        }
        &__btn{
        }
    }

    .result{

        padding: 35px 40px;
        margin-bottom: 50px;
        background-color: #fff7e4;
        &__number{
            color: $color-black;
            font-size: 16px;
            font-weight: 500;
        }
        &__explain{
            padding-top: 15px;
            color: $color-black;
            font-size: 13px;
            line-height: 21px;
            font-weight: 300;
            span{
                font-weight: 700;
            }
        }
    }



</style>
