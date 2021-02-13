import VueTippy         from 'vue-tippy';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import lazyload from 'vue-lazyload'
import OverlayScrollbars from 'overlayscrollbars';
import OverlayScrollbarsChat from './OverlayScrollbarsChat';
import VueDragDrop from 'vue-drag-drop';
import axios from '../../middleware/v1/instance'
import Snackbar from 'node-snackbar'
import VueDragscroll from 'vue-dragscroll'
import Ripple   from 'vue-ripple-directive';
//import Sticky   from 'vue-sticky-directive';
import Clamp from '@sparing-software/v-clamp';
import contenteditable from 'vue-contenteditable'
import moment from './moment';
import VueSticky from 'vue-sticky'
import eventHub from './event-hub'
import VueYoutube from 'vue-youtube'


export default{

	/*sticky: {
		plugin: Sticky
	},*/

	eventHub: {
		plugin: {
			install: V => {
				V.prototype.$eventHub = eventHub;
			}
		}
	},

	moment: {
		plugin: {
			install: V => {
				V.prototype.$moment = moment;
			}
		}
	},

	VueYoutube: {
		plugin: VueYoutube
	},

	Clamp: {
		plugin: Clamp
	},

	VueAwesomeSwiper: {
		plugin: VueAwesomeSwiper
	},

	contenteditable: {
		plugin: contenteditable
	},

	VueDragscroll: {
		plugin: VueDragscroll
	},

	ripple: {
		plugin: {
			install: (V) => {
				Ripple.color = 'rgba(100, 100, 100, 0.25)';
				V.directive('ripple', Ripple);
			}
		}
	},

	Axios: {
		plugin: {
			install: (V)=>{
				V.prototype.$axios = axios;
			}
		},
	},

	Snackbar: {
		plugin: {
			install: (V)=>{
				V.prototype.$snackbar = (opts)=>{
					let options = {
						text: opts.message,
						textColor: false,
						pos: '',
						customClass: opts.type || 'info',
						width: 'auto',
						showAction:	!!opts.event,
						actionText:	opts.event,
						actionTextAria:	'',
						alertScreenReader: false,
						actionTextColor: false,
						backgroundColor: false,
						duration: opts.duration || 6000,
						onActionClick: opts.action,
						onClose: ()=>{},
					};
					return Snackbar.show(options)
				};
			}
		},
	},

	VueDragDrop: {
		plugin: VueDragDrop
	},

	VueSticky: {
		plugin: {
			install: (V)=>{
				V.directive('sticky', VueSticky);
			}
		},
	},

	OverlayScrollbarsChat: {
		plugin: {
			install: (V)=>{
				V.directive('scrollchat', {
					inserted(el, binding) { // vnode
						let options = {
							className: 'os-theme-thin-light',
							sizeAutoCapable : true,
							paddingAbsolute : true,
							scrollbars : {
								clickScrolling : true,
								autoHide : "leave"
							},
							overflowBehavior:{
								x: 'hidden'
							}
						};
						if (!el.scrollbar) {
							el.scrollbar = OverlayScrollbars(el, Object.assign(options, binding.value));
							el.scrollbar.addExt('OverlayScrollbarsChat');
						}
					},

					unbind(el){ // binding, vnode
						if (el.scrollbar) el.scrollbar.destroy();
					}
				});
			}
		},
	},

	OverlayScrollbars: {
		plugin: {
			install: (V)=>{
				V.directive('scrollbar', {
					inserted(el, binding) {
						let options = {
							className: 'os-theme-thin-light',
							sizeAutoCapable : true,
							paddingAbsolute : true,
							scrollbars : {
								clickScrolling : true,
								autoHide : "leave"
							},
							overflowBehavior:{
								x: 'hidden'
							}
						};
						if (!('ontouchstart' in window || navigator.msMaxTouchPoints) && !el.scrollbar) {
							el.scrollbar = OverlayScrollbars(el, Object.assign(options, binding.value));
						}
					},

					unbind(el){
						if (el.scrollbar) el.scrollbar.destroy();
					}
				});
			}
		},
	},

	tooltip: {
		plugin : VueTippy,
		options: {
			directive  : 'tooltip',
			animation  : 'fade',
			arrow      : true,
			interactive: true,
			maxWidth   : 250,
			zIndex     : 999,
			placement  : 'top',

		}
	},

	lazyload: {
		plugin: lazyload,
		options: {
			preLoad: 1.3,
			//error: require('../../../img/svg/btn-loader.svg'),
			loading: require('../../assets/svg/loader-yellow.svg'),
			attempt: 1
		}
	},
};
