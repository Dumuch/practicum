import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import connectStoreHOC from '../../../helpers/connectStoreHOC';
import { IStore } from '../../../libs/store';
import { UserController } from '../../../controllers/userContoller';
import { Button } from '../../buttons/defaultButton';
import { Link } from '../../links/defaultLink';
import './styles.scss';
import { ChatController } from '../../../controllers/chatController';

//language=hbs
const template = `
    {{{inputLogin}}}

    <div class='search-user-list'>
        {{{items}}}
    </div>


    {{{buttonSearchUser}}}

    <div class='password-settings-form__actions'>
        {{{buttonSubmit}}}
        {{{buttonClose}}}
    </div>
`;

const closeModal = (input: HTMLInputElement) => {
    const event = new Event('closemodal', { bubbles: true });
    document.dispatchEvent(event);
    input.value = '';
};

class AddUserInChatForm extends Block {
    constructor() {
        super('form', {
            attr: {
                id: 'add-user-in-chat-form',
                class: 'add-user-in-chat-form',
            },
            inputLogin: new DefaultInput({
                name: 'login',
                label: 'Поиск по логину',
                placeholder: 'Введите логин',
            }),

            buttonSearchUser: new Button({
                text: 'Найти пользователя',
                attr: {
                    type: 'button',
                },
                events: {
                    click: async () => {
                        const input = this._children['inputLogin'].element?.querySelector('input');
                        const data = await UserController.findUser(input?.value ?? '');
                        if (!data) {
                            return;
                        }
                        this.setProps({
                            items: data.map(item => {
                                return new Link({
                                    label: item.login,
                                    attr: {
                                        type: 'button',
                                    },
                                    events: {
                                        click: (e) => {
                                            e.preventDefault();
                                            input!.value = item.login;
                                            this.setProps({ items: [], userId: item.id.toString() });
                                        },
                                    },
                                });
                            }),
                        });
                    },
                },
            }),

            buttonSubmit: new Button({
                text: 'Создать чат',
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
                        closeModal(this._children['inputLogin'].element?.querySelector('input')!)
                    },
                },
            }),

            events: {
                submit: async (e: SubmitEvent) => {
                    e.preventDefault();

                    const res = await ChatController.createChat();
                    if (!res) {
                        return;
                    }

                    await ChatController.addUsersToChat([Number(this.props.userId)], res.id);
                    await ChatController.getAllChats();

                    closeModal(this._children['inputLogin'].element?.querySelector('input')!)
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

export default connectStoreHOC(mapUserToProps)(AddUserInChatForm);
