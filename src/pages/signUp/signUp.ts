import './signUp.scss';
//language=hbs
window['page'] = `
    {{#> mainLayout }}

        {{#> modals/defaultModal title="Регистрация" class="sign-up__modal"}}

            {{#*inline "body"}}
                <form id="signUpForm" class="sign-up-form" action="#">
                    {{> input/input name="first_name" label="Имя" placeholder="Введите имя" }}
                    {{> input/input name="second_name" label="Фамилия" placeholder="Введите фамилию" }}
                    {{> input/input name="login" label="Логин" placeholder="Введите логин" }}
                    {{> input/input name="email" label="Email" placeholder="Введите электронную почту" type="email"}}
                    {{> input/input name="password" label="Пароль" placeholder="Введите пароль" type="password" autocomplete="new-password" }}
                    {{> input/input name="phone" label="Телефон" placeholder="Введите номер телефона" }}

                    <div class="sign-up-form__actions">
                        {{> button/button label="Зарегистрироваться" type="submit" formId="signUpForm"}}
                        {{> link/link label="Войти" href="/pages/signIn/signIn.html"}}
                    </div>
                </form>
            {{/inline}}

        {{/modals/defaultModal}}

    {{/mainLayout}}

`
