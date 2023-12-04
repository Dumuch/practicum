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

//language=hbs
const template = `
    <div class='chat-sidebar__header'>
        {{{linkProfile}}}
        {{{inputSearch}}}
        {{{createChat}}}
    </div>
    <div class='chat-list-wrapper'>
        {{{chatList}}}
    </div>
    
    {{{addUserInChatModal}}}
`;

class ChatSidebar extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'chat-sidebar',
            },
            linkProfile: new Link({
                label: 'Profile',
                attr: {
                    href: appRoutes.profile,
                    class: 'chat-sidebar__header-link',
                },
                events: {
                    click: e => {
                        e.preventDefault();
                        this.props.router?.go(appRoutes.profile);
                    },
                },
            }),
            inputSearch: new SearchInput({
                label: 'Поиск',
                attr: {
                    class: 'chat-sidebar__header-input',
                },
            }),
            createChat: new Button({
                text: 'Создать чат',
                events: {
                    click: async e => {
                        e.preventDefault();
                        this._children['addUserInChatModal'].setProps({ isVisible: true });
                    },
                },
            }),
            chatList: new ChatList(),
            addUserInChatModal: new DefaultModal({
                title: 'Добавить пользователя в чат',
                attr: {
                    class: 'add-user-in-chat-modal',
                },
                isVisible: false,
                body: new AddUserInChatForm(),
            }),
        });
    }

    async componentDidMount() {
        super.componentDidMount();
        if (!this.props.user && !this.props.isLoading) {
            const res = await UserController.getUserInfo();
            if (!res) {
                this.props.router?.go(appRoutes.signIn);
            }
            await ChatController.getAllChats();
            // this._children['chatList'].setProps({items: chats});
        }
    }

    render(): Node {
        return this.compile(template);
    }
}

function mapUserToProps(state: IStore) {
    return {
        router: state.router,
        isLoading: state.isLoading,
    };
}

export default connectStoreHOC(mapUserToProps)(ChatSidebar);
