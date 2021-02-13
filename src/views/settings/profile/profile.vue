<template>
    <panel_box title="Основная информация">
        <div class="profile-main">
            <div class="profile-main__picture">
                <p class="profile-main__text">
                    Фото профиля
                    {{ model.picture.error }}
                </p>
                <div class="profile-main__userpic">
                    <!-- <img class="content__img" src="./images/girl.png" alt="avatar" /> -->
                    <div class="profile-main__userpic--add">
                        <icon name="plus" />
                        <input type="file" @change="upload"/>
                    </div>
                    <div class="photo-fake" :style="{ backgroundImage: `url(${model.picture.preview || model.picture.value})`}" />
                </div>
                <p class="profile-main__info">
                    Будет отображаться на сайте и в личном кабинете. Вашему куратору будет
                    проще найти вас в сообщениях.
                </p>
            </div>
            <div class="profile-main__form">
                <div class="profile-main__container">
                    <input_box
                        v-for="key in ['name', 'last_name', 'middle_name']"
                        :key="key"
                        v-bind="model[key]"
                        v-model="model[key].value"
                    />
                </div>
                <div class="profile-main__container">
                    <input_box v-bind="model.phone" v-model="model.phone.value" />
                    <input_box v-bind="model.birthday" v-model="model.birthday.value" @change="changeDate($event)" />
                    <p class="profile-main__info" v-html="'* Указание даты рождения позволит вам получать скидки в дни родения'" />
                </div>
            </div>
        </div>
        <div class="profile-main__btn">
            <notification :notification="notification" />
            <button_box @click="saveData()" :performing='isPerforming' title="Сохранить"/>
        </div>
    </panel_box>
</template>

<script>
import panel_box from "@/components/regular/panel_box";
import notification from "@/components/notification";
import entity from "@/plugins/mixins/entity";
import validate from "@/plugins/mixins/validate";
import user from "@/middleware/v2/api/user";
import { mapState } from 'vuex';

export default {
    name: "profile",
    components: { panel_box, notification },
    mixins: [entity, validate],
    data() {
        return {
            isLoading: true,
            isPerforming: false,
            errorLog: [],
            notification: {
                status: true,
                message: ''
            },
            model: {
                picture: {
                    value: "",
                    preview: null,
                    error: "",
                },
                name: {
                    value: "",
                    label: "Имя",
                    error: "",
                    required: true,
                },
                last_name: {
                    value: "",
                    label: "Фамилия",
                },
                middle_name: {
                    value: "",
                    label: "Очество",
                },
                phone: {
                    value: "",
                    label: "Телефон",
                },
                birthday: {
                    type: "date",
                    value: "",
                    label: "Дата рождения",
                    mask: '####-##-##',
                    error: '',
                    validate: [
                        {
                            function: val => {
                                let date = val.split('-').map(n => Number(n))
                                return date[1] <= 12 && date[2] <= 31
                            },
                            title: 'Введите дату в формате ГГГГ-ММ-ДД'
                        }
                    ]
                },
            },
        };
    },
    computed: {
        ...mapState({
            user: state => state.base.user
        })
    },
    methods: {
        saveData: async function () {
            if (this.validate()) {
                this.isPerforming = true;
                this.notification.message = ""

                await user.updateUser(this.entity)
                    .then((res) => {
                        console.log(res)
                        this.$store.commit("base/SET_USER", res.data);
                        this.entity = res.data;
                        this.notification.status = true
                        this.notification.message = `Данные успешно обновлены`
                    })
                    .catch((err) => {
                        console.log(err)
                        this.notification.status = false
                        this.notification.message = `Произошла ошибка при обновлении. Код ошибки #${ err.status }`
                    });

                this.isPerforming = false;
            }
        },
        changeDate(value) {
            if (value.length < 10) {
                this.model.birthday.value = ''
            }
        },
        upload(e) {
            e.preventDefault();
            let files = e.target.files;
            for (let file of files) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                if (file.size >= 20971520) {
                    // binary its 20 megabytes
                    this.model.picture.error = "Максимальный размер файла - 20мб";
                } else {
                    reader.onload = (res) => {
                        this.model.picture.value = file;
                        this.model.picture.preview = res.target.result;
                        e.target.value = "";
                    };
                }
            }
        },
    },
    watch: {
        user: function (value) {
            this.entity = value;
        },
    },
    created() {
        this.entity = this.user;
    },
};
</script>

<style lang="scss">
.profile .panel__content {
    display: block;
}

.profile-main {
    display: flex;
    flex: 0 0 100%;
    margin: 22px 0px 0px 0px;
    @include media(wd) {
        flex-direction: column;
    }

    &__form {
        display: flex;

        @include media(wd) {
            flex-direction: row;
        }
        @include media(sm) {
            flex-wrap: wrap;
        }
    }

    &__container {
        @include media(sm) {
            &:nth-child(2) {
                margin: -10px 0px 0px 0px;
            }
        }
    }

    &__picture {
        position: relative;

        @include media(wd) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        @include media(sm) {
            order: 0;
            margin-bottom: 15px;
        }
        @include media(xs) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__userpic {
        margin-right: 20px;
        position: relative;
        max-width: max-content;
        @include media(wd) {
            display: flex;
            align-items: center;
            max-width: 689px;
            order: 1;
            margin-bottom: 10px;
        }
        @include media(lg) {
            order: 1;
        }
        @include media(sm) {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        @include media(xs) {
            position: absolute;
            right: 0;
            top: 0;
        }

        &--add {
            display: flex;
            z-index: 3;
            align-items: center;
            position: absolute;
            right: 6px;
            bottom: 5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #ffffff;
            background-color: #ffb600;
            cursor: pointer;

            svg {
                fill: #fff;
                position: relative;
            }

            @include media(wd) {
                right: 0;
                bottom: 0;
            }

            & > input[type=file],
            input[type=file]::-webkit-file-upload-button {
                cursor: pointer;
            }

            & > input {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
    }

    &__text {
        color: #000000;
        font-size: 12px;
        font-weight: 300;
        line-height: 21px;
        text-align: left;
        margin: 0px 0px 16px 0px;
        @include media(wd) {
            margin: 0px 0px 0px 0px;
        }
        @include media(xs) {
            margin: 0px 0px 8px 0px;
        }
    }

    &__info {
        color: #666666;
        font-size: 11px;
        font-weight: 300;
        line-height: 16px;
        max-width: 254px;
        margin: 0px 0px 10px 0px;
        @include media(wd) {
            margin: 0px 0px 0px 0px;
        }
        @include media(xs) {
            max-width: 193px;
        }
    }
}

.photo-fake {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: tomato;
    margin: 0 0 20px 0;
    background-size: cover;
    background-position: center;

    @include media(wd) {
        display: flex;
        order: 1;
        width: 61px;
        height: 60px;
        margin: 0;
    }
}
</style>
