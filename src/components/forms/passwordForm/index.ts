import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import './styles.scss';
import { Validator } from '../../../libs/validate';
import serializeFormData from '../../../helpers/serializeFormData';
import connectStoreHOC from '../../../helpers/connectStoreHOC';
import { IStore } from '../../../libs/store';
import { UserController } from '../../../controllers/userContoller';
import { IUpdateUserPassword } from '../../../types/user';
import { Button } from '../../buttons/defaultButton';

//language=hbs
const template = `
    {{{oldPassword}}}
    {{{newPassword}}}

    <div class='password-settings-form__actions'>
        {{{buttonSubmit}}}
        {{{buttonClose}}}
    </div>
`;

const validator = new Validator({
    oldPassword: [
        'currentPassword',
        {
            minValue: 8,
            maxValue: 40,
        },
    ],
    newPassword: [
        'currentPassword',
        {
            minValue: 8,
            maxValue: 40,
        },
    ],
});

class PasswordForm extends Block {
    constructor() {
        super('form', {
            attr: {
                id: 'password-form',
                class: 'password-settings-form',
            },
            oldPassword: new DefaultInput({
                name: 'oldPassword',
                label: 'Старый пароль',
                attr: {
                    class: 'profile-settings-field',
                },
                type: "password",
                value: "Tester999@tester.com",
                events: {
                    blur: (event: FocusEvent) => {
                        const element = <HTMLInputElement> event.currentTarget;
                        validator.validate('oldPassword', element.value);

                        if (validator.hasError('oldPassword')) {
                            validator.visibleErrorMessage('oldPassword', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('oldPassword');
                    },
                },
            }),

            newPassword: new DefaultInput({
                name: 'newPassword',
                label: 'Новый пароль',
                attr: {
                    class: 'profile-settings-field',
                },
                type: "password",
                value: "Tester999@tester.com",
                events: {
                    blur: (event: FocusEvent) => {
                        const element = <HTMLInputElement> event.currentTarget;
                        validator.validate('newPassword', element.value);

                        if (validator.hasError('newPassword')) {
                            validator.visibleErrorMessage('newPassword', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('newPassword');
                    },
                },
            }),

            buttonSubmit: new Button({
                text: 'Сменить пароль',
                attr: {
                    type: 'submit',
                },
            }),

            buttonClose: new Button({
                text: 'Закрыть',
                attr: {
                    type: 'button',
                },
                events: {
                    click: async (e) => {
                        e.preventDefault();

                        let event = new Event("closemodal", {bubbles: true});
                        document.dispatchEvent(event);
                    }
                }
            }),

            events: {
                submit: async (event: SubmitEvent) => {
                    event.preventDefault();
                    const data = serializeFormData<IUpdateUserPassword>(event);
                    Object.keys(data).forEach((key) => {
                        validator.validate(key, data[key as keyof IUpdateUserPassword] );
                        validator.visibleErrorMessage(key, true);
                    });

                    if (validator.hasError()) {
                        console.error('В валидации есть ошибки');
                    }

                    if(!this.props.isLoading) {
                        await UserController.updateUserPassword(data);
                        let event = new Event("closemodal", {bubbles: true});
                        document.dispatchEvent(event);
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
        isLoading: state.isLoading,
        user: state?.user,
    };
}

export default connectStoreHOC(mapUserToProps)(PasswordForm);
