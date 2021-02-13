import axios from '../instance'
import {URL, uploadFile} from '../helpers'

export default {
    getUser() {
        return axios.get(`${ URL }users/me`)
    },
    updateUser: async function (data) {
        data.picture = await uploadFile(data.picture, true)

        return axios.put(`${ URL }users/me`, data)
    },
    updateEmail(data) {
        return axios.put(`${ URL }change-email/`, data)
    },
    updatePassword(data) {
        return axios.put(`${ URL }change-password/`, data)
    },
    checkVK(id = "") {
        return axios.post(`${ URL }users/me/vk/check`, id)
    },
    linkVK(data) {
        return axios.post(`${ URL }users/me/vk`, data)
    },
    unlinkVK() {
        return axios.delete(`${ URL }users/me/vk/logout`)
    },
    checkFB(id) {
        return axios.post(`${ URL }users/me/fb/check`, id)
    },
    linkFB(data) {
        return axios.post(`${ URL }users/me/fb`, data)
    },
    unlinkFB() {
        return axios.delete(`${ URL }users/me/fb/logout`)
    },
}
