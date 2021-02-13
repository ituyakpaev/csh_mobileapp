import { query, URL } from '../../helpers'
import axios from '../../instance'

export default {
    getHomeworks(q) {
        return axios.get(`${ URL }bitrix/admin/homework/${ query(q) }`)
    },
    getHomework(id) {
        return axios.get(`${ URL }bitrix/admin/homework/${ id }`)
    },
    createHomework(data) {
        return axios.post(`${ URL }bitrix/admin/homework/`, data)
    },
    updateHomework(id, data) {
        return axios.put(`${ URL }bitrix/admin/homework/${ id }`, data)
    },
    deleteHomework(id) {
        return axios.delete(`${ URL }bitrix/admin/homework/${ id }`)
    },
}
