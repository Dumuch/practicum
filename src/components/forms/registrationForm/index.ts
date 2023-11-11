import { Block } from '../../../libs/block';
import { Input } from '../../input/input.tmpl';
import { Button } from '../../button/button';
import { Link } from '../../link/link';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';

//language=hbs
const template = `
        {{{inputFirstName}}}
        {{{inputSecondName}}}
        
        {{{inputLogin}}}
        {{{inputEmail}}}
        
        {{{inputPassword}}}
        {{{inputPhone}}}
        
        <div class="sign-up-form__actions">
            {{{buttonSubmit}}}
            {{{link}}}
        </div>
`;

export class RegistrationForm extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'sign-in-form',
      },
      inputFirstName: new Input({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Введите имя',
      }),

      inputSecondName: new Input({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
      }),

      inputLogin: new Input({
        name: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
      }),

      inputEmail: new Input({
        name: 'email',
        label: 'Email',
        placeholder: 'Введите электронную почту',
      }),

      inputPassword: new Input({
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
      }),

      inputPhone: new Input({
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Введите номер телефона',
      }),

      buttonSubmit: new Button({
        text: 'Регистрация',
      }),
      link: new Link('span', {
        label: 'Авторизация',
        href: appRoutes.signIn,
      }),
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
