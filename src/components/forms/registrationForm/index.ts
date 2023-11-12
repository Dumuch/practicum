import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
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
      inputFirstName: new DefaultInput({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Введите имя',
      }),

      inputSecondName: new DefaultInput({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
      }),

      inputLogin: new DefaultInput({
        name: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
      }),

      inputEmail: new DefaultInput({
        name: 'email',
        label: 'Email',
        placeholder: 'Введите электронную почту',
      }),

      inputPassword: new DefaultInput({
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
      }),

      inputPhone: new DefaultInput({
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Введите номер телефона',
      }),

      buttonSubmit: new Button({
        text: 'Регистрация',
      }),
      link: new Link({
        label: 'Авторизация',
        href: appRoutes.signIn,
      }),
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
