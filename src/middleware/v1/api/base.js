import axios from '../instance'

export default {
	commonInfo() {
		return axios.post('', {action: 'get_common_info'}).then(r => r.data)
	}, // request to get user data, deprecated to v2/api/user

	getMenu() {
		return axios.post('', {action: 'get_menu'}).then(r => r.data)
	},

}
