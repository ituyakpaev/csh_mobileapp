export const menu = [
	{
		title: 'Основные',
		rows: [
			{
				name: 'home',
				icon: 'home',
				title: 'Главная',
				submenu: [],
				count: 0,
				href: '/'
			},/*
			{
				name: 'notifications',
				icon: 'bell',
				title: 'Оповещения',
				submenu: [],
				count: 0,
				href: '/notifications',
				disabled: true,
			},*/
			{
				name: 'profile_payments',
				icon: 'gift',
				title: 'Платежи',
				submenu: [],
				count: 0,
				href: '/settings/payment',
				disabled: false,
			},
			{
				name: 'cart',
				icon: 'cart',
				title: 'Корзина',
				submenu: [],
				count: 0,
				href: 'https://alinamakarova.ru/personal/cart/',
				//href: '/cart',
			},
		]
	},
	{
		title: 'Школа',
		rows: [
			{
				group: 'Школа',
				name: 'lessons',
				title: 'Уроки',
				submenu: [],
				count: 0,
				href: '/lessons',
				//	href: '/lessons',
			},
			{
				group: 'Школа',
				name: 'courses',
				title: 'Курсы',
				count: 0,
				href: '/courses',
				submenu: [],
			},
			{
				group: 'Школа',
				name: 'dialogs',
				title: 'Сообщения',
				count: 0,
				href: '/dialogs',
				submenu: [],
			},
			{
				name: 'cart',
				title: 'База знаний',
				submenu: [],
				count: 0,
				href: 'https://alinamakarova.ru/baza',
			},
			{
				group: 'Школа',
				name: 'calculator',
				icon: 'calculator',
				title: 'Калькулятор',
				submenu: [],
				count: 0,
				href: '/calculator',
				//href: '/cart',
			},
		]
	},
	{
		title: 'Поддержка',
		rows: [
			{
				group: 'Поддержка',
				name: 'support',
				icon: 'service',
				title: 'Техподдержка',
				submenu: [],
				count: 0,
				href: '/support/contacts'
			},
			{
				group: 'Поддержка',
				name: 'faq',
				icon: 'question',
				title: 'FAQ',
				submenu: [],
				count: 0,
				href: '/faq',
				disabled: true,
			},
		]
	},
	{
		title: 'Куратор',
		curator: true,
		rows: [
			{
				title: 'Домашние работы',
				href: '/curator/groups'
			}
		]
	}
]
