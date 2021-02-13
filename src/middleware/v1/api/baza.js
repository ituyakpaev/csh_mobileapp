import axios from '../instance'
import { URL } from '../helpers'
import { query } from '../../v2/helpers'

export default {
    getArticles(q) {
        return axios.get(`${ URL }api_baza.php${ query({ action: 'get_articles', ...q }) }`)
    },
    getFavoriteArticles(q) {
        return axios.get(`${ URL }api_baza.php${ query({ action: 'get_favorits', ...q }) }`)
    },
    getArticle(id) {
        return axios.get(`${ URL }api_baza.php${ query({ action: 'get_article', id: id }) }`)
    },
    getSubscription() {
        return axios.get(`${ URL }api_baza.php?action=get_subscribe`)
    },
    getRubrics() {
        return axios.get(`${ URL }api_baza.php?action=get_sections`)
    },
    addFavorite(state = true, id) { // state = Добавить или убрать
        return axios.post(`${ URL }api_baza.php?action=state_favorit&state=${ !!state }&id=${ id }`)
    },
    getPrices() {
        return axios.get(`${ URL }api_baza.php?action=get_prices`)
    },
    unsubscribe() {
        return axios.post(`${ URL }api_baza.php?action=state_unsubscribe`, { state: false })
    },
    subscribe(plan = 3377) {
        // 3377 - mounth, 3378 - year
        if (plan !== 3377 || plan !== 3378) {
            return Promise.reject()
        }
        window.open(`https://alinamakarova.ru/yandex-checkout-sdk-php/subscribe.php?id=${ plan }`)
        return Promise.resolve()
    }
}
