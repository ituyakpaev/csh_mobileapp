import { query } from "@/middleware/v2/helpers";
import { URL } from '../helpers'
import axios from '../instance'

export default {
    getCards: async function (q) {
        q = { ...q, action: "get_cards" }
        return axios.get(`${ URL }api.php${ query(q)}`)
    },
    deleteCard: async function (id) {
        let q = { id: id, action: "del_card" }
        return axios.get(`${ URL }api.php${ query(q)}`)
    },
    getCookies: async function() {
        let q = { action: 'get_cookies' }
        return axios.post(`${ URL }api.php${ query(q)}`)
    }
}
