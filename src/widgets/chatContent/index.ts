import { Block, BlockProps } from '../../libs/block';
import chatContentMocks from '../../mocks/chatContentMocks';
import './styles.scss';
import { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { ICurrentChatItem } from '../../types/chat';
//language=hbs
const chatListTemplate = `{{{items}}}`;

class ChatContent extends Block {
    constructor() {
        super('ul', {
            attr: {
                class: 'message-list-group _message-list-group',
            },
        });
    }

    render(): Node {
        return this.compile(chatListTemplate);
    }
}

//language=hbs
const chatItemTemplate = `
    <div class='message-list-group__date'>
        {{{date}}}
    </div>
    <ul class='message-list'>
        {{{items}}}
    </ul>
`;

class ChatMessage extends Block {
    constructor(props: BlockProps = {}) {
        super('li', {
            ...props,
        });
    }

    render(): Node {
        return this.compile(chatItemTemplate);
    }
}

//language=hbs
const currentMessageTemplate = `
    {{{body}}}
    <div class='chat-message__date'>
        {{{date}}}
    </div>
`;

class CurrentMessage extends Block {
    constructor(props: BlockProps = {}) {
        super('li', {
            ...props,
        });
    }

    render(): Node {
        return this.compile(currentMessageTemplate);
    }
}



function mapUserToProps(state: IStore) {
    const groupByDate:Record<string, ICurrentChatItem[]> = {};

    state.currentChat?.items.forEach(item => {
            const date = new Date(item.time)
        if (groupByDate[date.toLocaleDateString()]) {
            groupByDate[date.toLocaleDateString()].push(item)
        } else {
            groupByDate[date.toLocaleDateString()] = [item]
        }
    })
    return {
        router: state.router,
        isLoading: state.isLoading,
        items: Object.keys(groupByDate).map(key => {
            const items = groupByDate[key]
            return new ChatMessage({
                date: key,
                items: items.map(message => {
                    return new CurrentMessage({
                        attr: {
                            class: message.user_id === state.user?.id ? 'chat-message_sender' : '',
                        },
                        body: JSON.parse(message.content).message,
                        date: new Date(message.time).toLocaleTimeString(),
                    });
                }),
            });
        }),
    };
}



const ChatContentHOC = connectStoreHOC(mapUserToProps)(ChatContent);


export const chatContent = new ChatContentHOC();
