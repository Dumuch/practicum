import './signIn.scss';
import { Block } from '../../libs/block';
import { Render } from '../../libs/render';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { Input } from '../../components/input/input.tmpl';
import { DefaultModal } from '../../components/modals/defaultModal.tmpl';
import { MainLayout } from '../../layouts/mainLayout/mainLayout.tmpl';

//language=hbs
const template = `
           {{#> helpers/childNodeWithBody name="mainLayout" bodyName="container" }}

        {{#> helpers/childNodeWithBody name="defaultModal" bodyName="modal__body" }}
            <form id="signInForm" class="sign-in-form" action="#">
                {{> helpers/childNode name="inputName" }}
                {{> helpers/childNode name="inputPassword" }}
    
                <div class="sign-in-form__actions">
                    {{> helpers/childNode name="button" }}
                    {{> helpers/childNode name="link" }}
                </div>
            </form>
        {{/helpers/childNodeWithBody}}
        {{/helpers/childNodeWithBody}}
    
`

const button = new Button({
    text: 'Click me',
});
const link = new Link({
    label: 'Нет аккаунта?',
    href: '/pages/signUp/signUp.html'
})

const inputName = new Input({
    name: 'name',
    label: 'Имя',
    placeholder: 'Введите имя'
})

const inputPassword = new Input({
    name: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    type: 'password'
})

const defaultModal = new DefaultModal({
    title:"Вход",
    class: "sign-in__modal"
})
const mainLayout = new MainLayout({

})
const children = [  { 'button': button }, { 'link': link }, { 'inputName': inputName }, { 'inputPassword': inputPassword }, {'defaultModal' : defaultModal}, {'mainLayout': mainLayout}]


class SignInPage extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, template, children);
    }
}


const signInPage = new SignInPage({
    text: 'Click me',
});

const app = new Render();
app.render('#app', [signInPage])


// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
        class: 'button12'
    });
}, 1000);
