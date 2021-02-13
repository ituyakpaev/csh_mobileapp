import axios from '../instance'

export default {
	getMenu(id) {
		return axios.post('', {action: 'get_dialog_menu', id}).then(r => {
			console.log(r)
			return r.data
		})
	},

	searchMenu({id, query}) {
		return axios.post('', {action: 'search_dialog_menu', id, query}).then(r => r.data)
	},

	getItem(data){
		return axios.post('', {action: 'get_dialog_item', ...data}).then(r => r.data)
	},

	removePost(id){
		return axios.post('', {action: 'remove_dialog_post', id}).then(r => r.data)
	},

	restorePost(id){
		return axios.post('', {action: 'restore_dialog_post', id}).then(r => r.data)
	},

	unreadPost(id){
		return axios.post('', {action: 'unread_dialog_post', id}).then(r => r.data)
	},

	getMore(id, lastPostId){
		return axios.post('', {action: 'get_dialog_more', id, lastPostId}).then(r => r.data)
	},

	sendMessage(data){
		return axios.post('', {action: 'add_dialog_message', ...data}).then(r => r.data)
	},

	fileUpload(data, progress) {
		return axios.post('', {action: 'upload_dialog_file', ...data}, { onUploadProgress: (e)=>{ progress(e) } }).then(r => r.data.data)
	},

	getLocalNav(){
		return axios.post('', {action: 'get_nav_dialogs'}).then(r => r.data)
	},

}
