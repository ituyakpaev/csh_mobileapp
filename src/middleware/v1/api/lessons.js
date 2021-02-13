import axios from '../instance'
import { URL } from '../helpers'

export default {
    getLessons() {
        return axios.get(`${ URL }mycoursesapi2.php`)
    },
    getLesson(id) {
        return axios.get(`${ URL }detailapi.php?ID=${ id }`)
    }
}
