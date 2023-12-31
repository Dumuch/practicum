import { Block } from '../../../libs/block';
import { Link } from '../../../components/links/defaultLink';
import { appRoutes } from '../../../constants/routes';
import './style.scss';
import { Wrapper } from '../../../components/wrapper';

//language=hbs
const template = `
    {{{items}}}
`;

export class HeaderNavigations extends Block {
    constructor() {
        super('ul', {
            attr: {
                class: 'site-nav-list',
            },
            items,
        });
    }
    render() {
        return this.compile(template);
    }
}

const items = [
    new Wrapper('li', {
        child: new Link({
            label: 'Главная страница',
            attr: {
                href: appRoutes.index,
            },
        }),
    }),
    new Wrapper('li', {
        child: new Link({
            label: 'Страница чата',
            attr: {
                href: appRoutes.chats,
            },
        }),
    }),

    new Wrapper('li', {
        child: new Link({
            label: 'Страница авторизации',
            attr: {
                href: appRoutes.signIn,
            },
        }),
    }),

    new Wrapper('li', {
        child: new Link({
            label: 'Страница регистрации',
            attr: {
                href: appRoutes.signUp,
            },
        }),
    }),

    new Wrapper('li', {
        child: new Link({
            label: 'Страница профиля',
            attr: {
                href: appRoutes.profile,
            },
        }),
    }),

    new Wrapper('li', {
        child: new Link({
            label: 'Страница 404',
            attr: {
                href: appRoutes.error404,
            },
        }),
    }),

    new Wrapper('li', {
        child: new Link({
            label: 'Страница 5**',
            attr: {
                href: appRoutes.error500,
            },
        }),
    }),
];
