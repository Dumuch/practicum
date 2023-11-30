import { Block } from '../../libs/block';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { IStore } from '../../libs/store';
import { Link } from '../../components/links/defaultLink';
import { appRoutes } from '../../constants/routes';
import { SearchInput } from '../../components/inputs/searchInput';
import { chatList } from '../chatList';
import { UserController } from '../../controllers/userContoller';

//language=hbs
const template = `
    <div class='chat-sidebar__header'>
        {{{linkProfile}}}
        {{{inputSearch}}}
    </div>
    <div class='chat-list-wrapper'>
        {{{chatList}}}
    </div>
`;

class ChatSidebarHeader extends Block {
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
                    click: (e) => {
                        e.preventDefault();
                        this.props.router?.go(appRoutes.profile);
                    }
                }
            }),
            inputSearch: new SearchInput({
                label: 'Поиск',
                attr: {
                    class: 'chat-sidebar__header-input',
                },
            }),
            chatList: chatList,
        });
    }

    async componentDidMount() {
        super.componentDidMount();
        if (!this.props.user && !this.props.isLoading) {
            await UserController.getUserInfo();
        }
    }

    render(): Node {
        return this.compile(template);
    }
}

function mapUserToProps(state: IStore) {
    return {
        router: state.router,
        isLoading: state.isLoading
    };
}

export default connectStoreHOC(mapUserToProps)(ChatSidebarHeader);
