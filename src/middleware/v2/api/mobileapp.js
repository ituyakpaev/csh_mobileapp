import { URL } from '../helpers'
import axios from '../instance'

export default {
    getVersion(version) {
        return axios.get(`${ URL }`)
    },
    getMenu() {},
    getContacts() {},
    getI18n() {

    }
}
