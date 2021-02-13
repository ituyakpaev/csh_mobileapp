<template>
    <div class="file-item">
        <a :href="href" target="_blank" class="file-inner" :class="{ 'file-item__dark': isDark, 'file-item__dark-background': backgroundDark }">
            <div class="file-ext">
                {{ type }}
            </div>
            <div class="file-name">
                {{ title }}
            </div>
            <div class="file-weight">
                {{ weight }}
            </div>
            <div class="file-icon" v-html="icon">
            </div>
        </a>
    </div>
</template>

<script>
    import svg from "../../plugins/svg";

    export default {
        name: "document",
        props: {
            href: String,
            type: String,
            title: String,
            weight: String,
            isDark: {
                type: Boolean,
                default: false
            },
            backgroundDark: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            icon() {
                return svg.download()
            }
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
    .file{
            margin: -5px;
            display: flex;
            flex-wrap: wrap;
            line-height: 1.2;

            @include breakPoint($breakpoint-tablet){
                margin: -10px;
            }

            &-item{
                padding: 5px;

                @include breakPoint($breakpoint-tablet){
                    padding: 10px;
                }

                &_dark{
                    color: #fff;
                }
            }

            &-inner{
                display: flex;
                flex-direction: column;
                position: relative;
                border: 2px solid #CCCCCC;
                height: 135px;
                width: 135px;
                padding: 15px;
                box-sizing: border-box;
                background: #fff;

                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 0;
                    height: 0;
                    border: 11px solid #fff;
                    border-bottom-color:$color-yellow;
                    border-left-color:$color-yellow;
                }


                .course__file-item_dark &{
                    background: #44525F;
                    border-color: #44525F;
                }

                &:hover{
                    border-color: $color-yellow;
                }
            }
            &-ext{
                font-size: 16px;
                flex: 1 1 auto;
            }
            &-name{
                font-size: 14px;
                font-weight: 400;
                color: $color-black;
                margin-bottom: 10px;

                .course__file-item_dark &{
                    color: #fff;
                }
            }
            &-weight{
                font-size: 13px;
            }
            &-icon{
                width: 20px;
                height: 20px;
                position: absolute;
                right: 15px;
                bottom: 15px;
                border: 1px solid #CCCCCC;
                border-radius: 50%;
                box-sizing: border-box;
                color: $color-yellow;

            }
        }

</style>
