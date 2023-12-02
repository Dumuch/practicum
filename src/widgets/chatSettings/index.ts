import { Block } from '../../libs/block';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { IStore } from '../../libs/store';
import { Link } from '../../components/links/defaultLink';
import { appRoutes } from '../../constants/routes';
import { SearchInput } from '../../components/inputs/searchInput';
import ChatList from '../chatList';
import { UserController } from '../../controllers/userContoller';
import { ChatController } from '../../controllers/chatController';
import { Button } from '../../components/buttons/defaultButton';
import { DefaultModal } from '../../components/modals/defaultModal';
import AddUserInChatForm from '../../components/forms/addUserInChatForm';
import { DefaultInput } from '../../components/inputs/defaultInput';
import { IUserInfo } from '../../types/user';

//language=hbs
const template = `
    <div class='chat-settings__add-user'>
        {{{inputLogin}}}

        <div class='chat-settings__search-user-list'>
            {{{searchUserList}}}
        </div>
        
        {{{buttonSearchUser}}}
    </div>
    <div class='chat-list-wrapper'>
        {{{addedUserList}}}
    </div>
`;

class ChatSettings extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'chat-settings',
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
                            searchUserList: data.map(item => {
                                return new Link({
                                    label: item.login,
                                    events: {
                                        click: async (e) => {
                                            e.preventDefault();
                                            input!.value = '';
                                            this.setProps({ searchUserList: [], userId: item.id.toString() });
                                            await ChatController.addUsersToChat([Number(item.id)], this.props.currentChat?.chatId)
                                            await ChatController.getUsersCurrentChat(Number(this.props.currentChat.chatId))
                                        },
                                    },
                                });
                            }),
                        });
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

const addedUserList = (users: Omit<IUserInfo, 'display_name'>[], chatId: string) => {
    return users.map(user => {
        return new Link({
            label: user.login,
            events: {
                click: async (e) => {
                    e.preventDefault();
                    await ChatController.deleteUsersCurrentChat([user.id], chatId)
                    await ChatController.getUsersCurrentChat(Number(chatId))
                    // input!.value = item.login;
                    // this.setProps({ searchUserList: [], userId: item.id.toString() });
                },
            },
        });
    })
}

function mapUserToProps(state: IStore) {
    return {
        currentChat: state.currentChat,
        router: state.router,
        isLoading: state.isLoading,
        addedUserList: addedUserList(state.currentChat?.users ?? [], state.currentChat?.chatId.toString() ?? '')
    };
}

export default connectStoreHOC(mapUserToProps)(ChatSettings);
