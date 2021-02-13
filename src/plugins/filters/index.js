import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru');


export default {

	date(value){
		let date = moment(value),
			today = moment(),
			text = ''
		;

		if ( date.isSame(today, 'd') ) {
			text = 'Сегодня'
		} else if (date.isSame(today.subtract(1, 'd'), 'd') ){
			text = 'Вчера'
		} else if (date.isSame(today, 'y') ){
			text = date.format('D MMMM');
		} else {
			text = date.format('D MMMM YYYY');
		}

		return text;
	},

	time(value){
		let date = moment(value),
			today = moment(),
			text = ''
		;

		if ( date.isSame(today, 'd') ) {
			text = `${date.format('HH:mm')}`
		} else if (date.isSame(today.subtract(1, 'd'), 'd') ){
			text = `Вчера ${date.format('HH:mm')}`
		} else if (date.isSame(today, 'y') ){
			text = date.format('D MMMM HH:mm');
		} else {
			text = date.format('D MMMM YYYY HH:mm');
		}

		return text;
	},

	/**
	 *
	 * @param value - Number | String
	 * @param mark - String
	 * @returns {string}
	 *
	 * {{ '1000000000000' | discharge('*') }}
	 */
	discharge(value, mark = ' '){
		if (!value) return '';
		return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, `$1${mark}`);
	},


	/**
	 *
	 * @param value - Number
	 * @param args - String
	 * @returns {string|*}
	 *
	 * {{ 100001 | declension('день', 'дня', 'дней') }}
	 */
	declension(value, ...args){
		if (!value) return '';
		let cases = [2, 0, 1, 1, 1, 2],num = Number(value);
		if ( isNaN(num) ){
			console.error('declension must be a Number');
			return value;
		}
		else {
			return args[(num%100>4 && num%100<20)? 2 : cases[(num%10<5)?num%10:5]];
		}
	},

	/**
	 *
	 * @param value - String
	 * @param limit - Number
	 * @param postfix - String
	 * @param minLastLetter
	 * @returns {string|*}
	 *
	 * {{ asdasdasdasd | crop(10, '...') }}
	 */
	crop(value, limit, postfix = '...', minLastLetter = 2){
		if ( !value ) return '';
		if ( !limit ) return value;
		let text = value.toString().trim(), arr, lastSpace;
		if( text.length <= limit) return text;
		text = text.slice( 0, limit);
		arr = text.split(' ');
		lastSpace = text.lastIndexOf(' ');
		if ( arr[arr.length - 1].length < minLastLetter && lastSpace > 0 ){
			text = text.substr(0, lastSpace);
		}
		return text + postfix;
	},

	roundCounter(value){
		const val = parseInt(value);
		return val > 99 ? '99+' : val;
	},

	nohtml(value) {
		let regex = /(<([^>]+)>)/ig
		return value.replace(regex, "")
	},

	enableLinks(value) {
		let regexp = /(https?:\/\/)?([-a-zA-Z0-9._]{1,256}\.[^\s<>()]{2,})/gi
		return value.replace(regexp, (f,g1,g2)=>`<a href="${g1 || 'http://'}${g2}" target="_blank">${g2}</a>`)
		//let regexp = /((http|https)\:\/\/(\S+))/g
		//return value.replace(regexp, '<a href="$1" target="_blank" rel="nofollow">$1</a>');
	}

}