import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import { Button } from '../../buttons/defaultButton';
import { Link } from '../../links/defaultLink';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';
import { isCurrentLogin, isMaxValue, isMinValue, isCurrentPassword } from '../../../libs/validate';
import serializeFormData from '../../../helpers/serializeFormData';

//language=hbs
const template = `
        {{{inputName}}}
        {{{inputPassword}}}
        
        <div class="sign-in-form__actions">
            {{{buttonSubmit}}}
            {{{link}}}
        </div>
`;

const validation: Record<string, (value: any) => boolean> = {
  login: (value: string) => isMinValue(value, 3) || isMaxValue(value, 20) || isCurrentLogin(value),
  password: (value: string) => isMinValue(value, 8) || isMaxValue(value, 40) || isCurrentPassword(value),
};

export class AuthorizationForm extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'sign-in-form',
      },
      inputName: new DefaultInput({
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

      buttonSubmit: new Button({
        text: 'Войти',
        attr: {
          type: 'submit',
        },
      }),
      link: new Link({
        label: 'Регистрация',
        href: appRoutes.signUp,
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
