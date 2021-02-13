import axios from '../../instance'
import { URL, query } from '../../helpers'

export default {
    getGroups(q) {
        return axios.get(`${ URL }bitrix/curator/homework/groups${ query(q) }`)
    },
    getHomeworks(group_id, q) {
        return axios.get(`${ URL }bitrix/curator/homework/groups/${ group_id }${ query(q) }`)
    },
    getUserHomeworks(user_id) {
        return axios.get(`${ URL }bitrix/curator/homework/${ user_id }`)
    },
    updateHomework(id, data) {
        return axios.put(`${ URL }bitrix/curator/homework/${ id }`, data)
    },
}
