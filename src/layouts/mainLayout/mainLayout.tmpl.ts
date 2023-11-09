import './mainLayout.scss';
import { Block } from '../../libs/block';
import { Link } from '../../components/link/link';

//language=hbs
const template = `
    <div class="layout">
        <header>
            <nav class="site-nav">

            </nav>
        </header>

        <main>
            <div class="container">
                {{body}}
            </div>
        </main>
    </div>
`


export class MainLayout extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, template);
    }
}

const arr = [
    {
        label: 'Главная страница',
        href: '/pages/index/index.html'
    },
    {
        label: 'Страница чата',
        href: '/pages/chat/chat.html'
    },

    {
        label: 'Страница авторизации',
        href: '/pages/signIn/signIn.html'
    },

    {
        label: 'Страница регистрации',
        href: '/pages/signUp/signUp.html'
    },

    {
        label: 'Страница профиля',
        href: '/pages/profile/profile.html'
    },

    {
        label: 'Страница 404',
        href: '/pages/404/404.html'
    },

    {
        label: 'Страница 5**',
        href: '/pages/500/500.html'
    }]

const links = arr.map(link => {

})


