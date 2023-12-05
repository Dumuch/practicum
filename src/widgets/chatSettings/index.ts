import { Block, BlockProps } from '../../libs/block';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import store, { IStore } from '../../libs/store';
import { Link } from '../../components/links/defaultLink';
import { UserController } from '../../controllers/userContoller';
import { ChatController } from '../../controllers/chatController';
import { Button } from '../../components/buttons/defaultButton';
import { DefaultInput } from '../../components/inputs/defaultInput';
import { IUserInfo } from '../../types/user';
import './styles.scss';

//language=hbs
const template = `
    <div class='chat-settings__add-user'>
        {{{inputLogin}}}

        <div class='chat-settings__search-user-list'>
            {{{searchUserList}}}
        </div>

        {{{buttonSearchUser}}}
    </div>
    <div class='chat-settings__added-users'>
        <span class='chat-settings__added-users-title'>Участники чата</span>
        <div class='chat-settings__added-users-list'>
            {{{addedUserList}}}
        </div>
    </div>
    {{{buttonDeleteChat}}}

    {{{buttonCloseModal}}}

`;

class ChatSettings extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'chat-settings',
            },
            inputLogin: new DefaultInput({
                name: 'login',
                label: 'Добавить участника чата',
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
                            searchUserList: data.map(item => {
                                return new Link({
                                    label: item.login,
                                    events: {
                                        click: async e => {
                                            e.preventDefault();
                                            input!.value = '';
                                            this.setProps({ searchUserList: [], userId: item.id.toString() });
                                            await ChatController.addUsersToChat(
                                                [Number(item.id)],
                                                this.props.currentChat!.chatId.toString(),
                                            );
                                            await ChatController.getUsersCurrentChat(
                                                Number(this.props.currentChat!.chatId),
                                            );
                                        },
                                    },
                                });
                            }),
                        });
                    },
                },
            }),
            buttonDeleteChat: new Button({
                text: 'Удалить чат',
                attr: {
                    type: 'button',
                    class: 'button button_error',
                },
                events: {
                    click: async () => {
                        await ChatController.deleteChat(this.props.currentChat!.chatId);
                        await ChatController.getAllChats();

                        const event = new Event('closemodal', { bubbles: true });
                        document.dispatchEvent(event);
                    },
                },
            }),
            buttonCloseModal: new Button({
                text: 'Закрыть',
                attr: {
                    type: 'button',
                    class: 'button button_border',
                },
                events: {
                    click: async () => {
                        const event = new Event('closemodal', { bubbles: true });
                        document.dispatchEvent(event);
                    },
                },
            }),
        });
    }

    async componentDidMount() {
        super.componentDidMount();
    }

    render(): Node {
        return this.compile(template);
    }
}

const addedUserList = (users: Omit<IUserInfo, 'display_name'>[], chatId: string, currentUserId: number) => {
    class UserItem extends Block {
        constructor(props: BlockProps = {}) {
            super('div', { ...props });
        }

        render(): Node {
            return this.compile(`<span>{{{label}}}</span><button>❌</button>`);
        }
    }

    return users
        .filter(user => user.id !== currentUserId)
        .map(user => {
            return new UserItem({
                label: user.login,
                events: {
                    click: async e => {
                        e.preventDefault();
                        if (e.target.tagName === 'button') {
                            await ChatController.deleteUsersCurrentChat([user.id], chatId);
                            await ChatController.getUsersCurrentChat(Number(chatId));
                            store.set('currentChat', null);
                        }
                    },
                },
            });
        });
};

function mapUserToProps(state: IStore) {
    return {
        user: state.user,
        currentChat: state.currentChat,
        router: state.router,
        isLoading: state.isLoading,
        addedUserList: addedUserList(
            state.currentChat?.users ?? [],
            state.currentChat?.chatId.toString() ?? '',
            state.user?.id ?? 0,
        ),
    };
}

export default connectStoreHOC(mapUserToProps)(ChatSettings);
