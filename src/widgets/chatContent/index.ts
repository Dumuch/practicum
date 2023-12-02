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
    return {
        router: state.router,
        items: []
    };
}

const ChatContentHOC = connectStoreHOC(mapUserToProps)(ChatContent);


export const chatContent = new ChatContentHOC({
    items: [],
});
