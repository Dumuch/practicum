import { Block, BlockProps } from '../../libs/block';
import chatContentMocks from '../../mocks/chatContentMocks';
import './styles.scss';
import { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
//language=hbs
const chatListTemplate = `{{{items}}}`;

class ChatContent extends Block {
    constructor() {
        super('ul', {
            attr: {
                class: 'message-list-group',
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
    console.log(state);
    return {
        router: state.router,
        items: []
        // items: state.currentChat?.map(item => {
        //     const { id, created_by, title, unread_count, avatar, last_message } = item;
        //
        //     return new ChatMessage({
        //         date: created_by.toString(),
        //         items: []
        //         // items: last_message?.content?.map(message => {
        //         //     return new CurrentMessage({
        //         //         attr: {
        //         //             class: message.isMine ? 'chat-message_sender' : '',
        //         //         },
        //         //         body: message.body,
        //         //         date: message.date,
        //         //     });
        //         // }),
        //     });
        // }),
    };
}

const ChatContentHOC = connectStoreHOC(mapUserToProps)(ChatContent);


export const chatContent = new ChatContentHOC({
    items: [],
});
