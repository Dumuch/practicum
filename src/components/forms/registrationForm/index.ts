import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import { Button } from '../../buttons/defaultButton';
import { Link } from '../../links/defaultLink';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';
import {
  isCurrentLogin,
  isCurrentPassword,
  isCurrentName,
  isMaxValue,
  isMinValue,
  isCurrentPhone,
  isCurrentEmail,
} from '../../../libs/validate';
import serializeFormData from '../../../helpers/serializeFormData';

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

const validation: Record<string, (value: any) => boolean> = {
  login: (value: string) => isMinValue(value, 3) || isMaxValue(value, 20) || isCurrentLogin(value),
  password: (value: string) => isMinValue(value, 8) || isMaxValue(value, 40) || isCurrentPassword(value),

  first_name: (value: string) => isCurrentName(value),
  last_name: (value: string) => isCurrentName(value),

  email: (value: string) => isCurrentEmail(value),
  phone: (value: string) => isCurrentPhone(value),
};

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
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.first_name(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      inputSecondName: new DefaultInput({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.last_name(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      inputLogin: new DefaultInput({
        name: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.login(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      inputEmail: new DefaultInput({
        name: 'email',
        label: 'Email',
        placeholder: 'Введите электронную почту',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.email(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      inputPassword: new DefaultInput({
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.password(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      inputPhone: new DefaultInput({
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Введите номер телефона',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;

            if (validation.phone(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement>event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),

      buttonSubmit: new Button({
        text: 'Регистрация',
      }),
      link: new Link({
        label: 'Авторизация',
        href: appRoutes.signIn,
      }),
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const data = serializeFormData(event);
          let hasError = false;
          Object.keys(data).forEach(key => {
            if (validation[key](data[key])) {
              hasError = true;
            }
          });

          if (hasError) {
            console.error('В валидации есть ошибки');
          } else {
            console.log(data);
          }
        },
      },
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
