import { Block } from '../../../libs/block';
import { Input } from '../../input/input.tmpl';
import { Button } from '../../button/button';
import { Link } from '../../link/link';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';

//language=hbs
const template = `
        {{{inputName}}}
        {{{inputPassword}}}
        
        <div class="sign-in-form__actions">
            {{{buttonSubmit}}}
            {{{link}}}
        </div>
`;

export class AuthorizationForm extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'sign-in-form',
      },
      inputName: new Input({
        name: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
      }),

      inputPassword: new Input({
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
      }),

      buttonSubmit: new Button({
        text: 'Войти',
      }),
      link: new Link({
        label: 'Регистрация',
        href: appRoutes.signUp,
      }),
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
