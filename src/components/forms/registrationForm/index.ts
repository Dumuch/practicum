import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import { Button } from '../../buttons/defaultButton';
import { Link } from '../../links/defaultLink';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';
import { Validator } from '../../../libs/validate';
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

const validator = new Validator({
    login: [
        'correctLogin',
        {
            minValue: 3,
            maxValue: 20,
        },
    ],
    password: [
        'currentPassword',
        {
            minValue: 8,
            maxValue: 40,
        },
    ],
    first_name: ['currentName'],
    last_name: ['currentName'],
    email: ['currentEmail'],
    phone: ['currentPhone'],
});

export class RegistrationForm extends Block {
    constructor() {
        super('form', {
            attr: {
                class: 'sign-up-form',
            },
            inputFirstName: new DefaultInput({
                name: 'first_name',
                label: 'Имя',
                placeholder: 'Введите имя',
                events: {
                    blur: (event: FocusEvent) => {
                        const element = <HTMLInputElement>event.currentTarget;
                        validator.validate('first_name', element.value);

                        if (validator.hasError('first_name')) {
                            validator.visibleErrorMessage('first_name', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('first_name');
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
                        validator.validate('second_name', element.value);

                        if (validator.hasError('second_name')) {
                            validator.visibleErrorMessage('second_name', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('second_name');
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
                        validator.validate('login', element.value);

                        if (validator.hasError('login')) {
                            validator.visibleErrorMessage('login', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('login');
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
                        validator.validate('email', element.value);

                        if (validator.hasError('email')) {
                            validator.visibleErrorMessage('email', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('email');
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
                        validator.validate('password', element.value);

                        if (validator.hasError('password')) {
                            validator.visibleErrorMessage('password', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('password');
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
                        validator.validate('phone', element.value);

                        if (validator.hasError('phone')) {
                            validator.visibleErrorMessage('phone', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('phone');
                    },
                },
            }),

            buttonSubmit: new Button({
                text: 'Регистрация',
                attr: {
                    type: 'submit',
                },
            }),
            link: new Link({
                label: 'Авторизация',
                href: appRoutes.signIn,
            }),
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();
                    const data = serializeFormData(event);
                    console.log(data);

                    Object.keys(data).forEach(key => {
                        validator.validate(key, data[key]);
                        validator.visibleErrorMessage(key, true);
                    });

                    if (validator.hasError()) {
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
