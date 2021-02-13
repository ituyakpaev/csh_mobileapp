import axios from 'axios'
import store from '../../plugins/store/index.js'
import { URL } from './helpers'

const instance = axios.create({
	// api for courses and lessons, bitrix
	baseURL: `${ URL }api.php`, //`https://alinamakarova.ru/lk/api_test.php`, // "https://www.alinamakarova.ru/lk/api.php"
	//withCredentials: true,
	headers: {
		post: {
			'Content-Type': 'multipart/form-data'
		}
	}
})

instance.defaults.transformRequest = [function (data) {
	if (!data) return data

	let formData = new FormData();

	Object.keys(data).map(function(key) {
		if (Array.isArray(data[key])) {

			for (let i = 0; i < data[key].length; i++) {
				formData.append(`${key}[]`, typeof data[key][i] === 'object' ?  JSON.stringify(data[key][i]) : data[key][i]);
			}

		} else {
			formData.append(key, data[key]);
		}
	});
	console.log(formData)

	return formData;
}];

instance.interceptors.request.use(function(config) {
	config.url.indexOf('?') >= 0 ? config.url += `&` : config.url += '?'
	config.url += `token=${ store.state.base.session.token }`
	return config
})

instance.interceptors.response.use(
	response => {
		// isProd &&
		if ( response.data && response.data.user && response.data.user.not_authoruze ) {
			store.dispatch('base/exit')
		} else {
			console.log(response)
			store.commit('base/SET_AUTHSTATE', true)
		}
		return response;
	},
	err => {
		console.log(err)
		if (err.response) {
			if (err.status === 401) {
				store.dispatch('base/exit')
			}
		}
		return Promise.reject(error);
	}
);



export default instance;
