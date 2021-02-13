import axios from '../instance'

export default {
	getList() {
		return axios.post('', {action: 'get_course_all'}).then(r => r.data)
	},

	getInfo(id){
		return axios.post('', {action: 'get_course_info', id}).then(r => r.data)
	},

	getItem(data){
		return axios.post('', {action: 'get_course_item', ...data}).then(r => r.data)
	},

	getLocalNav(){
		return axios.post('', {action: 'get_nav_courses'}).then(r => r.data)
	},

	fileUpload(data) {
		return axios.post('', {action: 'upload_offer_file', ...data}).then(r => r.data.data)
	},


	sendOffer(data) {
		return axios.post('', {action: 'send_offer_files', ...data}).then(r => r.data.data)
	},

	saveNameCertificate(data) {// id and name
		return axios.post('', { action: 'save_data_certificate', ...data }).then(r => r)
	},

	changeNameCertificate(data) {
		return axios.post('', { action: 'change_data_certificate', ...data}).then(r => r)
	},

	sendLetterCertificate(email) {
		return axios.post('', { action: 'send_email', email: email })
	}

}
