export const versions = {
    '0.0.1': 'active',
    '0.0.2': 'warn',
    '0.0.3': 'disabled'
}

export const menu = [
    {
        title: 'Школа',
        rows: [
            {
                name: 'home', // id
                icon: 'home', // icon name for icon component
                title: 'Главная',
                count: 0, // count for dialogs
                disabled: true, // disabled state
                type: 'href', // href - open browser, screen - open screen name
                href: '', // site href
                sreen: '' // screen name
            }
        ]
    }
]

export const contacts = {
    telegram: {
        title: 'Телеграм',
        url: 'tg://resolve?domain=79269551492',
        content: '+7 (926) 955-14-92'
    },
    whatsapp: {
        title: 'Whatsapp',
        url: 'https://wa.me/79269551492',
        content: '+7 (926) 955-14-92'
    },
    vk_adaptive: {
        title: 'Вконтакте',
        url: 'https://vk.com/kursy_konditera',
        content: 'Курсы кондитера | Cake School Алины Макаровой'
    },
    email: {
        title: 'Почта',
        url: 'mailto:info@cake-school.com',
        content: 'info@cake-school.com'
    }
}
