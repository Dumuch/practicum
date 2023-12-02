import { Block, BlockProps } from '../../libs/block';
import './styles.scss';
import { AvatarImage } from '../../components/images/avatarImage';
import { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { IChat } from '../../types/chat';
import { ChatController } from '../../controllers/chatController';

//language=hbs
const chatListTemplate = `{{{items}}}`;

class ChatList extends Block {
    constructor() {
        super('ul', {
            attr: {
                class: 'chat-list',
            },
         });
    }

    render(): Node {
        return this.compile(chatListTemplate);
    }
}

//language=hbs
const chatItemTemplate = `
    <div class='chat-item__left-block'>
        {{{avatarImage}}}
    </div>
    <div class='chat-item__center-block'>
        <span>
            {{{userName}}}
        </span>
        <span>
            {{#if lastTextIsMe }}<b>Вы: </b>{{/if}}
            {{{lastText}}}
        </span>
    </div>

    <div class='chat-item__right-block'>
        <span>
            {{{date}}}
        </span>
        <span>
            {{{countMessage}}}
        </span>
    </div>
`;

class ChatItem extends Block {
    constructor(props: BlockProps = {}) {
        super('li', {
            ...props,
        });
    }

    render(): Node {
        return this.compile(chatItemTemplate);
    }
}

const chatList = (allChats: IChat[]) => {
    return allChats.map(item =>{
        const { avatar,last_message,created_by, title, unread_count, id } = item;

        return new ChatItem({
            avatarImage: new AvatarImage({
                width: '20',
                height: '20',
                src: '/assets/images/noimage.jpeg',
            }),
            userName: '',
            lastText: last_message ?? '',
            date: '',
            countMessage: unread_count.toString(),
            lastTextIsMe: last_message ?? '',
            events: {
                click: async (e) => {
                    e.preventDefault();
                    const data = await ChatController.getCurrentChatById(id);
                },
            },
        });
    })
}


function mapUserToProps(state: IStore) {
    return {
        router: state.router,
        isLoading: state.isLoading,
        items: chatList(state.allChats)
    };
}

export default connectStoreHOC(mapUserToProps)(ChatList);

