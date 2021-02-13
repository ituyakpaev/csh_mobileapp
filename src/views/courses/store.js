import {course as Api} from '@/middleware/v1/api'
import $hub from '../../plugins/library/event-hub'

const mainMenuItem = {
	id: '',
	title: 'Главная',
	text: ''
};

/*const offerFile = {
	id: '',
	url: ''
};*/

export default {
	namespaced: true,

	state: {
		list: [],

		main: {},

		menu: [],

		item: {

		},

		course_id: null,

		certificate: {
			state: false,
			name: '',
			mega_certificate: false
		},

		offer: {
			thumb: [],
			id: [],
			confirm: false,
		},
	},

	mutations: {
		SET_LIST(state, {items}){
			state.list = [...items];
		},
		SET_INFO(state, {home, menu, content, id, certificate, certificate_data, mega_certificate}){
			let first = home || home === false ? [] : [mainMenuItem]
			state.menu = [...first, ...menu || []];

			if ( home ){
				for (let i = 0; i < state.menu.length; i++){
					if ( state.menu[i].submenu && state.menu[i].submenu.length) {
						for (let j = 0; j < state.menu[i].submenu.length; j++){
							if ( home === state.menu[i].submenu[j].id){
								state.menu[i].open = true;
								break;
							}
						}
					}
				}
			}

			state.main = JSON.parse(JSON.stringify(content));
			state.course_id = id;
			state.certificate.state = certificate
			state.certificate.name = certificate_data
			state.certificate.mega_certificate = mega_certificate
		},
		SET_ITEM(state, value) {
			state.item = JSON.parse(JSON.stringify(value));
		},
		SET_OFFER_THUMB(state, {index, value}){
			$hub.$set(state.offer.thumb, index, value)
		},
		SET_OFFER_ID(state, {index, value}){
			$hub.$set(state.offer.id, index, value)
		},
		SET_OFFER_CONFIRM(state, value){
			state.offer.confirm = value;
		},
	},

	actions: {

		async getList({commit}){
			const data = await Api.getList();
			commit("SET_LIST", data);
			return data;
		},

		async getInfo({commit}, id){
			const data = await Api.getInfo(id);
			data.id = id;
			console.log(data)
			commit("SET_INFO", data);
			return data;
		},

		async getItem({commit}, data){
			const value = await Api.getItem(data);
			commit("SET_ITEM", value);
			return value
		},

		async getLocalNav({rootState, commit}){

			if ( rootState.base.localNav.courses ) return false;

			const data = await Api.getLocalNav();
			console.info(data)
			let menu = data.menu;

			if ( data.menu.length > 1 ){
				menu.unshift({
					id: 'all',
					title: "Все",
					count: 0
				})
			}

			commit("base/SET_LOCAL_NAV", {menu, section: 'courses'}, {root: true});
		},


		async fileUpload({commit}, {file, index}){
			const data = await Api.fileUpload({file});
			commit('SET_OFFER_THUMB', {index, value: data.thumb || `../img/offer-doc-2.jpg`})
			commit('SET_OFFER_ID', {index, value: data.id})
			return data;
		},

		async sendOffer({state}){
			await Api.sendOffer({
				files_id: state.offer.id,
				course_id: state.course_id,
			});
		},
	},

	getters: {

	}
}
