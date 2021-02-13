import {dialogs as Api} from '../../middleware/v1/api'
import Hub from '../../plugins/library/event-hub'

export default {
	namespaced: true,

	state: {

		popup: {
			open: false,
			title: '',
			message: '',
		},

		options: {
			maxAssetLength: 10,
			accept: ['pdf', 'png', 'jpg', 'jpeg', 'zip', 'rar', 'mov', 'mp4', 'avi', 'doc', 'docx'],

		},

		uploadView: false,

		list: [],

		menu: null,

		item: {
			id: null,
			lastId: null,
			welcome: false,
			main: '',
			chat: [],
			done: false,
		},

		search: '',

		sending: {
			message: '',

			reply: false,

			assets:[]

			/*reply: {
				id: 1254,
				title: 'Евгения Тортикова 22:15',
				text: 'Минобороны РФ выложило в соцсетях скриншот из игры под видом «неоспорим...'
			},*/

		},

	},

	mutations: {
		SET_MENU(state, {menu}){
			if (Array.isArray(menu)){
				state.menu = [...menu];
			} else {
				menu = null;
			}
		},

		SET_MENU_COUNT(state, {id, count, date, text}){
			let idxMenu, idxItem;

			if ( state.menu === null ) return;

			state.menu.forEach((menu, i)=> {
				if ( menu.items ){
					const idx = menu.items.findIndex( item => item.id.toString() === id.toString());
					if ( idx >= 0 ){
						idxMenu = i;
						idxItem = idx;
					}
				}
			});
			if (state.menu[idxMenu]) state.menu[idxMenu].items[idxItem].count = count;
			if (state.menu[idxMenu]) state.menu[idxMenu].items[idxItem].text = text;
			if (state.menu[idxMenu]) state.menu[idxMenu].items[idxItem].date = date;
		},

		SET_ITEM(state, {data, id} ) {
			try {
				state.item.id = id;
				state.item.welcome = data.welcome;
				state.item.main = data.main || '';
				state.item.chat = data.chat && data.chat.length ? [...data.chat].reverse() : [];
				state.item.done = data.done || !!data.welcome;
				state.item.lastId = !state.item.done ? state.item.chat[0].id : null;
			} catch (e) {
				state.item.chat = null;
			}
		},

		CLEAR_ITEM(state){
			state.item.lastId = null;
			state.item.id = null;
			state.item.welcome = false;
			state.item.main = '';
			state.item.chat = [];
			state.item.done = false;
		},
		ADD_ITEM(state, data){
			const items = data.chat && data.chat.length ? data.chat.reverse() : [];
			state.item.chat = [...items, ...state.item.chat];
			state.item.done = data.done;
		},
		APPEND_POST(state, post){
			state.item.chat = [...state.item.chat || [], post];
			state.item.welcome = false;
		},
		SET_SEARCH(state, value){
			state.search = value;
		},
		SET_UPLOAD_VIEW(state, value){
			state.uploadView = value;
		},
		CLEAR_SENDING(state){
			state.sending = {
				message: '',
				reply: null,
				assets: []
			};
			state.uploadView = false;
		},
		SET_MESSAGE(state, value){
			state.sending.message = value;
		},
		OPEN_INFO_POPUP(state, {title, message}){
			state.popup.open = true;
			state.popup.title = title;
			state.popup.message = message;
		},
		CLOSE_INFO_POPUP(state){
			state.popup.open = false;
		},
		REMOVE_ASSET(state, id){
			const idx = state.sending.assets.findIndex( i => i.id === id);
			if (idx >= 0) state.sending.assets = [...state.sending.assets.slice(0, idx), ...state.sending.assets.slice(idx + 1)];
		},
		ADD_REPLY(state, data){
			state.sending.reply = data;
		},
		ADD_ASSET(state, obj){
			state.sending.assets.push(obj);
		},
		UPDATE_ASSET(state, {localId, obj}){
			const idx = state.sending.assets.findIndex(i => i.localId === localId);
			if (idx >= 0) state.sending.assets = [...state.sending.assets.slice(0, idx), obj, ...state.sending.assets.slice(idx + 1)];
		},

		UNREAD_POST(state, id){
			const idx = state.item.chat.findIndex(i => i.id === id);
			if ( idx >= 0 ) Hub.$set(state.item.chat[idx], 'unread', true);
		},

		REMOVE_POST(state, id){
			if ( state.item.chat ){
				const idx = state.item.chat.findIndex(i => i.id === id);
				if ( idx >= 0 ) Hub.$set(state.item.chat[idx], 'removed', true);
			}
		},

		RESTORE_POST(state, id){
			if ( state.item.chat ){
				const idx = state.item.chat.findIndex(i => i.id === id);
				if ( idx >= 0 ) Hub.$set(state.item.chat[idx], 'removed', false);
			}
		},
	},

	actions: {

		async getMenu({commit}, id){
			if ( id ){
				const data = await Api.getMenu(id);
				console.log(data)
				commit("SET_MENU", data);
			}
		},

		async searchMenu({commit, state}, id){
			const data = await Api.searchMenu({id, query: state.search});
			commit("SET_MENU", data);
		},

		async getItem({rootState, commit, state}, id){
			state.item.done = false;
			commit("CLEAR_ITEM", false);
			const curator = rootState.base.user.curator;
			if ( id !== undefined ) {
				const data = await Api.getItem({id, curator});
				console.log(id)
				console.log(curator)
				console.log(data)
				commit("SET_ITEM", {data: data.data, id});
			}
		},

		async getMore({commit, state}){
			if ( !state.item.id || !state.item.lastId ) return false;
			const data = await Api.getMore(state.item.id, state.item.lastId)
				.then(res => {
					console.log(res)
					console.log(res.data.chat[0].message)
				});
			commit("ADD_ITEM", data.data);
		},

		async sendMessage({rootState, state}){

			const assets = state.sending.assets.filter( asset => !asset.localId )

			const data = {
				curator: rootState.base.user.curator,
				user_id: rootState.base.user.id,
				dialog_id: state.item.id,
				message: state.sending.message,
				reply: state.sending.reply ? state.sending.reply.id : null,
				assets
			};
			await Api.sendMessage(data)
				.then(res => {
					console.log(res)
					console.log(state.sending.message)
				});
		},

		async fileUpload({commit}, file){

			const localId = '_' + Math.random().toString(36).substr(2, 9);

			const asset = {
				name: file.name,
				localId,
				progress: 0,
			};

			commit("ADD_ASSET", asset);

			const data = await Api.fileUpload({file}, progress => {
				let obj = Object.assign({}, asset);
				obj.progress = Math.ceil(100 * progress.loaded / progress.total);

				commit("UPDATE_ASSET", {localId, obj});
			})

			commit("UPDATE_ASSET", {localId, obj: data});

		},

		async getLocalNav({rootState, commit}){
			if ( rootState.base.localNav.dialogs ) return new Promise((resolve)=>resolve());
			const data = await Api.getLocalNav();
			let menu = data.menu;
			if ( rootState.base.user.curator ){
				menu.unshift({
					id: 'all',
					title: "Все",
					count: 0
				})
			}
			commit("base/SET_LOCAL_NAV", {menu, section: 'dialogs'}, {root: true});
			return data;
		},

		async removePost({commit}, id){
			await Api.removePost(id);
			commit("REMOVE_POST", id);
		},

		async restorePost({commit}, id){
			await Api.restorePost(id);
			commit("RESTORE_POST", id);
		},

		async unreadPost({commit}, id){
			await Api.unreadPost(id);
			commit("UNREAD_POST", id);
		},
	},

	getters: {

	}
}
