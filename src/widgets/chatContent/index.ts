import { Block, BlockProps } from '../../libs/block';
import chatContentMocks from '../../mocks/chatContentMocks';
import './styles.scss'
//language=hbs
const chatListTemplate = `{{{items}}}`;

export class ChatContent extends Block {
  constructor(props: BlockProps = {}) {
    super('ul', {
      attr: {
        class: 'message-list-group'
      },
      ...props,
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

export const chatContent = new ChatContent({
  items: chatContentMocks.map(item => {
    const { date, messages } = item;
    return new ChatMessage({
      date,
      items: messages.map(message => {
        return new CurrentMessage({
          attr: {
            class: message.isMine ? 'chat-message_sender' : '',
          },
          body: message.body,
          date: message.date,
        });
      }),
    });
  }),
});
