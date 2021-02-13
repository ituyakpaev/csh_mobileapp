import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

moment.fn['round'] = function(precision, key, direction) {
	if(typeof direction === 'undefined') direction = 'round';

	const keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'],
		maxValues = [24, 60, 60, 1000];

	key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

	if (key.indexOf('s', key.length - 1) === -1) {
		key += 's';
	}
	let value = 0,
		rounded  = false,
		subRatio = 1,
		maxValue ;

	for (const i in keys) {
		const k = keys[i];
		if (k === key) {
			value    = this._d['get' + key]();
			maxValue = maxValues[i];
			rounded  = true;
		} else if(rounded) {
			subRatio *= maxValues[i];
			value    += this._d['get' + k]() / subRatio;
			this._d['set' + k](0);
		}
	}

	value = Math[direction](value / precision) * precision;
	value = Math.min(value, maxValue);
	this._d['set' + key](value);

	return this;
};

moment.fn['ceil'] = function(precision, key) {
	return this.round(precision, key, 'ceil');
};

moment.fn['floor'] = function(precision, key) {
	return this.round(precision, key, 'floor');
};

window['moment'] = moment;

export default moment;