import axios from '../../instance'
import { query, URL, uploadFile } from '../../helpers'

export default {
    getHomeworks(course_id ,q) {
        return axios.get(`${ URL }bitrix/client/homework/${ course_id }${ query(q) }`)
    },
    getMyHomeworks(course_id, q) {
        return axios.get(`${ URL }bitrix/client/homework/me/${ query({ ...q, course_id: course_id }) }`)
    },
    createHomework(data) {
        return axios.post(`${ URL }bitrix/client/homework/`, data)
    },
    updateHomework(id,  data) {
        return axios.put(`${ URL }bitrix/client/homework/${ id }`, data)
    },
    createFile: async function (homework_id, data) {
        console.log(data)
        data.link = await uploadFile(data.link)

        console.log(data)

        return axios.post(`${ URL }bitrix/client/homework/${ homework_id }/files`, data)
    },
    deleteFile(homework_id, file_id) {
        return axios.delete(`${ URL }bitrix/client/homework/${ homework_id }/files/${ file_id }`)
    },
}
