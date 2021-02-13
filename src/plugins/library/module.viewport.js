/**
new ViewPort({
	'0': ()=>{
		// do something
	},
	'800': ()=>{
		// do something
	}
});
 */


'use strict';
import $ from 'jquery';

export default class Viewport {
	constructor(options) {

		this.currentPoint = null;
		this.winWith = null;

		Object.assign(this._options = {}, options);

		this._options['Infinity'] = null;

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				this.__init();
			});
		} else {
			this.__init();
		}
	}


	__init(){

		if ( this._options ){

			let sbw = 0;

			this.winWith = window.innerWidth + sbw;
			this.__checkCurrentViewport();

			window.addEventListener("resize", ()=>{
				this.winWith = window.innerWidth + sbw;
				this.__checkCurrentViewport();
			});

		}
	}

	__checkCurrentViewport(){

		let point = 0, callback = null;

		for (let key in this._options) {

			if ( key > this.winWith ){
				if ( point !== this.currentPoint ) {
					this.currentPoint = point;
					callback();
				}
				return false;
			}
			point = key; callback = this._options[key];
		}

	}

	__scrollBarWidth(){
		let scrollDiv = document.createElement('div'), sbw;
		scrollDiv.className = 'scroll_bar_measure';
		$(scrollDiv).css({
			width: '100px',
			height: '100px',
			overflow: 'scroll',
			position: 'absolute',
			top: '-9999px'
		});
		document.body.appendChild(scrollDiv);
		sbw = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);
		return sbw;
	}
}
