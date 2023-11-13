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
    {{{inputLogin}}}
    {{{inputPassword}}}

    <div class="sign-in-form__actions">
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
});

export class AuthorizationForm extends Block {
    constructor() {
        super('form', {
            attr: {
                class: 'sign-in-form',
            },
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
