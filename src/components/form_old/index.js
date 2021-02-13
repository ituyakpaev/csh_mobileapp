import MFormWrap     from './form.vue';
import MFormInput    from './input.vue';
import MFormTextarea from './textarea.vue';
import MFormCheckbox from './checkbox.vue';
import MFormRadio    from './radio.vue';

export {
	MFormWrap,
	MFormInput,
	MFormTextarea,
	MFormCheckbox,
	MFormRadio,
};


/**
 *
 * 	rules: {
 * 		empty: 'Сообщение ошибки',
		pattern: [
			{
				regex: /^(http(s)?:\/\/)?(www\.)?vk\.com\/[A-z0-9_\-.]+\/?/i,
				message: 'Проверьте корректность ссылки'
			}
		],
	}
 *
 */