import './signIn.scss';
import { Block } from '../../libs/block';
import { Render } from '../../libs/render';
//language=hbs
const template = `{{#> mainLayout }}

    {{#> modals/defaultModal title="Вход" class="sign-in__modal"}}

        {{#*inline "body"}}
            <form id="signInForm" class="sign-in-form" action="#">
                {{> input/input name="name" label=text placeholder="Введите имя" }}
                {{> input/input name="password" label="Пароль" placeholder="Введите пароль" type="password" }}

                <div class="sign-in-form__actions">
                    {{> button/button label="Авторизоваться" type="submit" }}
                    {{> link/link label="Нет аккаунта?" href="/pages/signUp/signUp.html"}}
                </div>

            </form>
        {{/inline}}

    {{/modals/defaultModal}}

{{/mainLayout}}
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
app.render("#app", signInPage)

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    signInPage.setProps({
        text: 'Click me, please',
    });
}, 1000);
