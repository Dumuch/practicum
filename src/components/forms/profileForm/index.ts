import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import './styles.scss';
import { Validator } from '../../../libs/validate';
import serializeFormData from '../../../helpers/serializeFormData';

//language=hbs
const template = `
        {{{inputFirstName}}}
        {{{inputSecondName}}}
        
        {{{inputLogin}}}
        {{{inputDisplayName}}}
    
        {{{inputEmail}}}
        {{{inputPhone}}}      
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

export class ProfileForm extends Block {
    constructor() {
        super('form', {
            attr: {
                id: 'profile-form',
                class: 'profile-settings-form',
            },
            inputFirstName: new DefaultInput({
                name: 'first_name',
                label: 'Имя',
                placeholder: 'Иван',
                value: 'Иван',
                attr: {
                    class: 'profile-settings-field',
                },
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
                placeholder: 'Иванов',
                value: 'Иванов',
                attr: {
                    class: 'profile-settings-field',
                },
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

            inputDisplayName: new DefaultInput({
                name: 'display_name',
                label: 'Имя в чате',
                placeholder: 'Иван',
                value: 'Иван',
                attr: {
                    class: 'profile-settings-field',
                },
            }),

            inputLogin: new DefaultInput({
                name: 'login',
                label: 'Логин',
                placeholder: 'ivan',
                value: 'ivan',
                attr: {
                    class: 'profile-settings-field',
                },
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
                placeholder: 'test@test.com',
                value: 'test@test.com',
                attr: {
                    class: 'profile-settings-field',
                },
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

            inputPhone: new DefaultInput({
                name: 'phone',
                label: 'Телефон',
                placeholder: '+7 (900) 123 12 12',
                value: '+7 (900) 123 12 12',
                attr: {
                    class: 'profile-settings-field',
                },
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
