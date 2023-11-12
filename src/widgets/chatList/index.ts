import { Block, BlockProps } from '../../libs/block';
import chatListMock from '../../mocks/chatListMock';
import './styles.scss';
import { AvatarImage } from '../../components/images/avatarImage';

//language=hbs
const chatListTemplate = `{{{items}}}`;

export class ChatList extends Block {
  constructor(props: BlockProps = {}) {
    super('ul', {
      attr: {
        class: 'chat-list',
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

export class ChatItem extends Block {
  constructor(props: BlockProps = {}) {
    super('li', {
      ...props,
    });
  }

  render(): Node {
    return this.compile(chatItemTemplate);
  }
}

export const chatList = new ChatList({
  items: chatListMock.map(item => {
    const { userName, lastText, date, countMessage, lastTextIsMe } = item;
    return new ChatItem({
      avatarImage: new AvatarImage({
        width: '20',
        height: '20',
        src: '/assets/images/noimage.jpeg',
      }),
      userName,
      lastText,
      date,
      countMessage,
      lastTextIsMe,
    });
  }),
});
