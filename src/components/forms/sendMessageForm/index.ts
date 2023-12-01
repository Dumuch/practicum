import { Block } from '../../../libs/block';
import { Button } from '../../buttons/defaultButton';
import { ChatInput } from '../../inputs/chatInput';
import './styles.scss';
import serializeFormData from '../../../helpers/serializeFormData';
import { Validator } from '../../../libs/validate';

//language=hbs
const template = `
    {{{addSourceButton}}}
    {{{inputMessage}}}
    {{{submitButton}}}
`;

const validator = new Validator({
    message: ['hasForbiddenCharacters', 'notEmpty'],
});

export class SendMessageForm extends Block {
    constructor() {
        super('form', {
            attr: {
                class: `send-message-form`,
            },
            error: false,
            addSourceButton: new Button({
                text: 'Прикрепить файл',
            }),
            inputMessage: new ChatInput({
                attr: {
                    class: 'send-message-form__input-message',
                },
                placeholder: 'Сообщение (Запрещен ввод HTML тегов)',
                name: 'message',
                events: {
                    blur: (event: FocusEvent) => {
                        const element = <HTMLInputElement>event.currentTarget;
                        validator.validate('message', element.value);

                        if (validator.hasError('message')) {
                            validator.visibleErrorMessage('message', true);
                        }
                    },
                    focus: () => {
                        validator.hideErrorMessage('message');
                    },
                },
            }),
            submitButton: new Button({
                text: 'Отправить',
                attr: {
                    type: 'submit',
                },
            }),
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const data = serializeFormData(event);
                    // Object.keys(data).forEach(key => {
                    //     validator.validate(key, data[key]);
                    //     validator.visibleErrorMessage(key, true);
                    // });

                    if (validator.hasError()) {
                        console.error('В валидации есть ошибки');
                    } else {
                        console.log(data);
                    }
                },
            },
        });
    }

    componentUnMount() {
        validator.clear();
        super.componentUnMount();
    }

    render(): Node {
        return this.compile(template);
    }
}
