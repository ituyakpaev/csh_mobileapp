<template>
    <div class="btn-file">
        <input type="file" multiple @change="upload($event)">
        <button class="btn" :class="color" @click="$emit('click')">
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
    name: "file",
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Выбрать'
        },
        color: {
            type: String,
            default: 'yellow'
        }
    },
    methods: {
        upload(e) {
            e.preventDefault();
            let files = e.target.files

            for (let file of files) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (res) => {
                    this.$emit('input', {value: file, preview: res.target.result})
                    this.$emit('upload', {value: file, preview: res.target.result})
                    e.target.value = ''
                }
            }
        },
        deleteImage() {
            this.$emit('input', {value: null, preview: null})
        }
    }
}
</script>

<style lang="scss">
.btn-file {
    position: relative;
    width: max-content;

    & > input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        cursor: pointer;

        &:hover + .btn {
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
        }
    }

    .btn {
        margin: 0;
    }
}
</style>
