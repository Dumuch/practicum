import { Block, BlockProps } from '../../libs/block';
import './styles.scss';
import { AvatarImage } from '../../components/images/avatarImage';
import store, { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { IChat, ICurrentChat, ICurrentChatItem } from '../../types/chat';
import { ChatController } from '../../controllers/chatController';
import { WSTransport, WSTransportEvents } from '../../libs/WSTransport';
import getLastMessageFromContent from '../../helpers/getLastMessageFromContent';
import { appConstants } from '../../constants/app';

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

const chatList = (allChats: IChat[], currentChat?: ICurrentChat, userId?: number, currentUserLogin?: string) => {
    return allChats.map(item => {
        const { last_message, unread_count, id, title, avatar } = item;
        return new ChatItem({
            attr: {
                class: `${id === currentChat?.chatId ? 'active' : ''}`,
            },
            avatarImage: new AvatarImage({
                width: '20',
                height: '20',
                src: avatar ? appConstants.baseUrl + '/resources' + avatar : '/assets/images/noimage.jpeg',
            }),
            userName: '',
            lastText: getLastMessageFromContent(last_message?.content),
            date: title,
            countMessage: unread_count.toString(),
            lastTextIsMe:
                last_message?.user.login === currentUserLogin && getLastMessageFromContent(last_message?.content),
            events: {
                click: async e => {
                    e.preventDefault();

                    if (currentChat?.chatId === id) {
                        return;
                    }
                    await ChatController.getCurrentChatById(id);
                    const { token } = await ChatController.getChatToken(id);
                    let contentOffset = 0;
                    let hasAnyMessages = true;
                    let startChat = false;

                    const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
                    await socket.connect();
                    const chatBody = document.querySelector('._chat-body__content');
                    let lastScrollTop = 0;

                    const uniqItems: Record<string, ICurrentChatItem> = {};

                    socket.on(WSTransportEvents.Message, async (data: any) => {
                        if (Array.isArray(data)) {
                            data.forEach(i => {
                                uniqItems[i.id] = i;
                            });

                            store.set('currentChat', { ...currentChat, items: Object.values(uniqItems).reverse() });

                            const list = document.querySelector('._message-list-group');

                            if (list && chatBody) {
                                chatBody.scrollTo(0, chatBody.scrollHeight - lastScrollTop);
                            }

                            if (!startChat && chatBody) {
                                chatBody.scrollTo(0, chatBody.scrollHeight);
                                startChat = true;
                            } else {
                                await ChatController.getAllChats();
                            }

                            if (data.length === 20) {
                                hasAnyMessages = true;
                            }
                        } else {
                            socket.send({
                                content: '0',
                                type: 'get old',
                            });
                        }
                    });

                    store.set('socket', socket);
                    const list = document.querySelector('._message-list-group');

                    list &&
                        chatBody &&
                        chatBody.addEventListener('scroll', () => {
                            if (chatBody.scrollTop < 100 && hasAnyMessages) {
                                contentOffset += 10;
                                lastScrollTop = chatBody.scrollHeight;

                                socket.send({
                                    content: contentOffset.toString(),
                                    type: 'get old',
                                });
                                hasAnyMessages = false;
                            }
                        });

                    socket.send({
                        content: contentOffset.toString(),
                        type: 'get old',
                    });
                },
            },
        });
    });
};

function mapUserToProps(state: IStore) {
    return {
        user: state.user,
        router: state.router,
        isLoading: state.isLoading,
        items: chatList(state.allChats, state?.currentChat ?? undefined, state.user?.id, state.user?.login),
    };
}

export default connectStoreHOC(mapUserToProps)(ChatList);
