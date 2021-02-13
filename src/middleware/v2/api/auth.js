import axios from '../instance'
import { URL, query } from '../helpers'

export default {
    auth(username, password) {
        let data = new URLSearchParams()
        data.append('username', username)
        data.append('password', password)
        return axios.post(`${ URL }login/access-token`, data)
    },
    testToken(token) {
        return axios({
            url: `${ URL }login/test-token`,
            method: 'post',
            headers: {
                Authorization: token,
            }
        })
    },
}
