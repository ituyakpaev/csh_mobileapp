import axios from 'axios'
import store from '../../plugins/store/index.js'

/*
            400 - any validation error (individual error code is also provided)
            401 - authorization problem
            402 - payment required (user has not payed)
            403 - not enough rights
            422 - serialization or required fields error
         */

let instance = axios.create()

instance.interceptors.request.use(function(config) {
    // set session token to request headers
    if (!config.headers.common['Authorization']) {
        config.headers.common['Authorization'] = store.state.base.session.token
    }
    //config.url.indexOf('?') !== -1 ? config.url += `&token=${ store.state.base.session.token }` : config.url += `?token=${ store.state.base.session.token }`
    return config
})

instance.interceptors.response.use(
    res => {
        return res
    },
    err => {
        let error = {
            code: 0, // deprecated
            status: 0,
            error_code: 0,
            message: '',
            description: '',
            err: err
        }
        if (err.response) {
            error.status = err.response.status
            error.code = err.response.status
            if (error.status === 404) {
                error.message = 'Сущность не найдена'
                error.description = 'Вероятно, вы перешли по неправильной ссылке.'
            } else if (error.status === 422) {
                error.message = 'Ошибка валидации'
                error.description = 'Сервер вернул данные как неправильные. Вероятнее всего, мы не предусмотрели это, и поэтому не сказали вам об этом раньше.'
            } else if (error.status === 403) {
                error.message = "Похоже, у вас нет прав на эту операцию"
            } else {
                error.message = 'Неизвестная ошибка'
            }
        } else {
            if (err.message === 'Network Error') { // cors or internet connection
                error.message = 'Ошибка сети'
                error.description = ''
            } else {
                error.message = err.message
                error.description = 'Неизвестная ошибка'
            }
        }

        if (error.status === 400) { // any data error
            error.message = err.response.data.detail.message
            error.error_code = err.response.data.detail.code
        }
        if (error.status === 401) {
            store.dispatch('base/exit')
        }

        throw error
    }
)

export default instance
