import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import { Button } from '../../buttons/defaultButton';
import { Link } from '../../links/defaultLink';
import { appRoutes } from '../../../constants/routes';
import './styles.scss';
import { Validator } from '../../../libs/validate';
import serializeFormData from '../../../helpers/serializeFormData';
import connectStoreHOC from '../../../helpers/connectStoreHOC';
import { UserController } from '../../../controllers/userContoller';
import { IStore } from '../../../libs/store';
import { ISignInUser } from '../../../types/user';

//language=hbs
const template = `
    {{{inputLogin}}}
    {{{inputPassword}}}

    <div class="sign-in-form__actions">
        {{{buttonSubmit}}}
        {{{link}}}
    </div>
    {{#if errorMessage}}
        <span class='error-messages sign-in-form__error-message'>{{{errorMessage}}}</span>
    {{/if}}
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


class AuthorizationForm extends Block {
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
                        const element = <HTMLInputElement> event.currentTarget;
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
                type: 'password',
                events: {
                    blur: (event: FocusEvent) => {
                        const element = <HTMLInputElement> event.currentTarget;
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
                attr: {
                    href: appRoutes.signUp,
                },
                events: {
                    click: (e) => {
                        e.preventDefault();
                        this.props?.router?.go(appRoutes.signUp);
                    },
                },
            }),
            events: {
                submit: async (event: SubmitEvent) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const data = serializeFormData<ISignInUser>(event);

                    Object.keys(data).forEach(key => {
                        validator.validate(key, data[key as keyof ISignInUser]);
                        validator.visibleErrorMessage(key, true);
                    });
                    if (!validator.hasError() && !this.props.isLoading) {
                        const res = await UserController.signIn(data);
                        if (res) {
                            const res = await UserController.getUserInfo();
                            if (res) {
                                this.props.router?.go(appRoutes.chats);
                            }
                        } else {
                            this.setProps({ errorMessage: 'Данные некорректны, попробуйте еще раз' });
                            setTimeout(() => {
                                this.setProps({ errorMessage: '' });
                            }, 2500);
                        }
                    }

                },
            },
        });

    }

    render(): Node {
        return this.compile(template);
    }
}

function mapUserToProps(state: IStore) {
    return {
        router: state.router,
        isLoading: state.isLoading,
        first_name: state?.user?.first_name,
    };
}

export default connectStoreHOC(mapUserToProps)(AuthorizationForm);
