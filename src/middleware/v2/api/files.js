import { URL, query } from '../helpers'
import axios from '../instance'

export default {
    uploadImage(file, crop = false) {
        let data = new FormData()
        data.append('file', file)
        return axios.post(`${ URL }file/upload_picture_link${ query({ crop: crop }) }`, data)
    }
}
