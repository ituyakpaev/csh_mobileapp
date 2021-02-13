import Developing from "../../views/error/page_isdeveloping";
import Page404 from "../../views/error/page_404";

export default [
    {
        path: '/',
        //redirect: '/dialogs',
        name: 'Home',
        //component: Developing,
        component: () => import('../../views/home/index'),
        meta: {
            title: 'Главная страница',
            section: 'home'
        },
    },
    {
        path: '/settings',
        name: 'settings',
        redirect: '/',
        component: () => import('../../views/settings/index'),
        meta: {
            title: '',
            section: 'settings'
        },
        children: [
            {
                path: 'profile',
                component: () => import('../../views/settings/profile'),
                meta: {
                    title: 'Настройки профиля',
                    section: 'settings'
                }
            },
            {
                path: 'payment',
                component: () => import('../../views/settings/payment'),
                meta: {
                    title: 'Настройки оплат',
                    section: 'settings'
                }
            }
        ]
    }, // TODO: production no ready
    {
        path: '/courses',
        component: ()=> import('../../views/courses/index'),
        name: 'courses',
        meta: {
            title: 'Мои курсы',
            section: 'courses'
        }
    },
    {
        path: '/courses/all',
        component: ()=> import('../../views/courses/index'),
        name: 'courses-all',
        meta: {
            title: 'Мои курсы',
            section: 'courses'
        }
    },
    {
        path: '/courses/:case',
        component: ()=> import('../../views/courses/item/index'),
        name: 'courses-case',
        meta: {
            title: 'Мои курсы',
            section: 'courses'
        }
    },
    {
        path: '/courses/:case/:item',
        component: ()=> import('../../views/courses/item/index'),
        name: 'courses-item',
        meta: {
            title: 'Мои курсы',
            section: 'courses'
        }
    },
    {
        path: '/admin/course_homeworks',
        component: () => import('../../views/courses/homeworks/admin/index'),
        name: 'admin_homeworks',
        meta: {
            title: 'Домашние работы для курсов',
            section: 'admin'
        }
    },
    {
        path: '/curator/groups',
        component: () => import('../../views/courses/homeworks/curator/index'),
        name: 'curator_groups',
        meta: {
            title: 'Группы учеников',
            section: 'groups'
        }
    },
    {
        path: '/curator/groups/:id',
        component: () => import('../../views/courses/homeworks/curator/students'),
        name: 'curator_group_students',
        meta: {
            title: 'Ученики группы',
            section: 'groups'
        }
    },
    {
        path: '/curator/groups/:group_id/:user_id',
        component: () => import('../../views/courses/homeworks/curator/homework/index'),
        name: 'curator_homework',
        meta: {
            title: 'Ученики группы',
            section: 'groups'
        }
    },
    {
        path: '/dialogs',
        // redirect: '/dialogs/all',
        component: ()=> import('../../views/dialogs/index'),
        name: 'dialogs',
        meta: {
            title: 'Сообщения',
            section: 'dialogs'
        }
    },

    {
        path: '/dialogs/:case',
        component: ()=> import('../../views/dialogs/index'),
        name: 'dialogs-case',
        meta: {
            title: 'Сообщения',
            section: 'dialogs'
        }
    },

    {
        path: '/dialogs/:case/:item',
        component: ()=> import('../../views/dialogs/index'),
        name: 'dialogs-item',
        meta: {
            title: 'Сообщения',
            section: 'dialogs'
        }
    },
    {
        path: '/calculator',
        component: () => import('../../views/calculators/calculator1'),
        name: 'calculator',
        meta: {
            title: 'Калькулятор',
            section: 'calculator'
        }
    },
    {
        path: '/lessons',
        name: 'lessons',
        component: () => import('../../views/lessons/index'),
        meta: {
            title: 'Мои уроки',
            section: 'lessons'
        }
    },
    {
        path: '/lessons/:id',
        name: 'lesson',
        component: () => import('../../views/lessons/item/index'),
        meta: {
            title: 'test',
            section: 'lesson',
            native: true
        }
    },
    {
        path: '/baza',
        name: 'baza',
        component: () => import('../../views/baza/index'),
        meta: {
            title: 'База знаний',
            section: 'baza'
        }
    },
    {
        path: '/baza/:id',
        name: 'baza_article',
        component: () => import('../../views/baza/article/index'),
        meta: {
            title: 'Статья',
            section: 'baza'
        }
    },
    {
        path: '/faq',
        name: 'faq',
        //redirect: '/',
        component: () => import('../../views/support/faq/index'),
        meta: {title: 'Раздел в разработке'}
    },
    {
        path: '/support/contacts',
        name: 'support_contacts',
        component: () => import('../../views/support/contacts'),
        meta: {
            title: 'Контакты поддержки'
        }
    },
    {path: '/support',name: 'support',component: Developing,meta: {title: 'Раздел в разработке'}},
    {path: '/notifications',name: 'notifications',component: Developing,meta: {title: 'Раздел в разработке'}},
    {path: '/cart',name: 'cart',component: Developing,meta: {title: 'Раздел в разработке'}},
    {
        path: '*/*',
        component: Page404,
        name: '404',
        meta: {
            title: 'Страница не существует'
        }
    }
]
