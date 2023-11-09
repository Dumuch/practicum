import './signIn.scss';
import { Block } from '../../libs/block';
import { Render } from '../../libs/render';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
//language=hbs
const template = `#> mainLayout }}
    {{#> modals/defaultModal title="Вход" class="sign-in__modal"}}

        {{#*inline "body"}}
            <form id="signInForm" class="sign-in-form" action="#">
                {{> input/input name="name" label=text placeholder="Введите имя" }}
                {{> input/input name="password" label="Пароль" placeholder="Введите пароль" type="password" }}

                <div class="sign-in-form__actions">
                </div>

            </form>
        {{/inline}}

    {{/modals/defaultModal}}
/mainLayout}}
`


class SignInPage extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, template);
    }
}


const signInPage = new SignInPage({
    text: 'Click me',
});

const app = new Render();
app.render('#app', [signInPage])

const button = new Button({
    text: 'Click me',
});
const link = new Link({
    label: 'Нет аккаунта?',
    href: '/pages/signUp/signUp.html'
})

app.render('.sign-in-form__actions', [button, link])

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
        class: 'button12'
    });
}, 1000);
