import { Block } from '../../../libs/block';
import { Button } from '../../buttons/defaultButton';
import { ChatInput } from '../../inputs/chatInput';
import './styles.scss';
import serializeFormData from '../../../helpers/serializeFormData';
import { Validator } from '../../../libs/validate';
import store, { IStore } from '../../../libs/store';
import connectStoreHOC from '../../../helpers/connectStoreHOC';
import { ISendMessage } from '../../../types/chat';
import { WSTransportEvents } from '../../../libs/WSTransport';

//language=hbs
const template = `
    {{{addSourceButton}}}
    {{{inputMessage}}}
    {{{submitButton}}}
`;

const validator = new Validator({
    message: ['hasForbiddenCharacters', 'notEmpty'],
});



class SendMessageForm extends Block {
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
                        const element = <HTMLInputElement> event.currentTarget;
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

                    const data = serializeFormData<ISendMessage>(event);
                    Object.keys(data).forEach(key => {
                        validator.validate(key, data[key as keyof ISendMessage]);
                        validator.visibleErrorMessage(key, true);
                    });

                    if (!validator.hasError()) {
                        const input = this._children['inputMessage'].element?.querySelector('input');
                        input!.value = '';
                        this.props.socket?.send({
                            content: data,
                            type: 'message',
                        });

                        const scrollToBottom = (e: any) => {
                            if (Array.isArray(e)) {
                                const chatBody = document.querySelector('._chat-body__content');
                                chatBody && chatBody.scrollTo(0, chatBody.scrollHeight);
                                this.props.socket?.off(WSTransportEvents.Message, scrollToBottom);
                            }
                        };

                        this.props.socket?.on(WSTransportEvents.Message, scrollToBottom);

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

function mapUserToProps(state: IStore) {
    return {
        socket: state.socket,
        isLoading: state.isLoading,
    };
}

export default connectStoreHOC(mapUserToProps)(SendMessageForm);


