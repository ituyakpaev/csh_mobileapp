<template>
    <div class="faq-sidebar">
        <input v-model="search_string" placeholder="Поиск по диалогам..." class="faq-sidebar__input"  :style="{ 'background-image': `url(${ basePath }svg/search.svg)` }">
        <div class="faq-sidebar__list">
            <div v-for="(theme, index) in faq_processed" :key="theme.name + index" class="faq-sidebar__item faq-sidebar__item--active" >
                {{ theme.name }}
                <div class="faq-sidebar__question">
                    <div v-for="(question, index) in theme.questions" :key="question.name + index">
                        {{ question.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        props: {
            faq: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                search_string: ''
            }
        },
        computed: {
            faq_processed() {
                if (this.search_string.length > 2) {
                    let s = this.search_string,
                        result = []
                    this.faq.map(theme => {
                        if (theme.name.indexOf(s) !== -1) {
                            theme.name = theme.name.split(s).join(`<span>${ s }</span>`)
                            result.push(theme)
                        } else {
                            let questions = []
                            theme.questions.map(question => {
                                if (question.name.indexOf(s) !== -1) {
                                    question.name = question.name.split(s).join(`<span>${ s }</span>`)
                                    questions.push(question)
                                }
                            })
                            theme.questions = questions
                            result.push(theme)
                        }
                    })

                    return result
                } else {
                    return this.faq
                }
            }
        }
    }
</script>

<style  lang="scss" scoped>
.faq-sidebar {
	margin: 30px 0px;
	background-color: #fff;
	border-right: 1px solid #ececec;
	min-width: 470px;
		@include media (wd){
		min-width: 310px;
		}
		@include media (md){
		min-width: 260px;
		}
			@include media (sm){
		min-width: 240px;
		}
			@include media (xs){
		min-width: unset;
		margin: 30px 0px 0px 0px;
		}

		&__input {
			padding: 20px 20px 20px 60px;
			border-bottom: 1px solid #ececec;
			width: 100%;
			background-repeat: no-repeat;
			background-position: 30px center;
			background-size: 13px 14px;
			background-color: #fff;
		}

		&__list {
			margin: 30px 0px 0px 0px;
			padding: 0px 10px 0px 0px;
				@include media (xs){
					display: none;
		}
		}
		&__question{
			display: none;
		}
		&__item{
			color: $color-black;
			font-family: $font-main;
			font-size: 14px;
			font-weight: 300;
			line-height: 21.6px;
			padding: 0px 0px 0px 40px;
			margin: 0px 0px 20px 0px;
		}
		&__item--active{
			color:  $color-black;
			font-family: $font-main;
			font-size: 14px;
			font-weight: 500;
			line-height: 21.6px;
			position: relative;
			&::before{
				content: "";
				position: absolute;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				top: 7px;
				left: 23px;
				background-color: $color-yellow;
			}
		}
}

</style>
