import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout/mainLayout.tmpl';
import { Link } from '../../components/link/link';
import { appRoutes } from '../../constants/routes';
import { SearchInput } from '../../components/inputs/searchInput';
import { chatList } from '../../widgets/chatList';
import { AvatarImage } from '../../components/images/avatarImage.tmpl';
import { Button } from '../../components/button/button';
import { chatContent } from '../../widgets/chatContent';
import { ChatInput } from '../../components/inputs/chatInput';
import './styles.scss';
import { SendMessageForm } from '../../components/forms/sendMessageForm';

//language=hbs
const pageTemplate = `
    <div class='chat-sidebar'>
        <div class='chat-sidebar__header'>
            {{{linkProfile}}}
            {{{inputSearch}}}
        </div>
        <div class='chat-list-wrapper'>
            {{{chatList}}}
        </div>
    </div>

    <div class='chat-body'>
        <div class='chat-body__header'>
            <div class='user-info'>
                {{{avatarImage}}}
                <span class='user-info__name'>
                    {{{userName}}}
                </span>
            </div>
            {{{openMenuButton}}}
        </div>
        <div class='chat-body__content _chat-body__content'>
            {{{chatContent}}}
        </div>

        <div class='chat-body__footer'>
            {{{sendMessageForm}}}
        </div>
    </div>
`;

class ChatPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}

const chatPage = new ChatPage('div', {
  attr: {
    class: 'chat-container',
  },
  linkProfile: new Link({
    label: 'Profile',
    attr: {
      href: appRoutes.profile,
      class: 'chat-sidebar__header-link',
    },
  }),
  inputSearch: new SearchInput({
    label: 'Поиск',
    attr: {
      class: 'chat-sidebar__header-input',
    },
  }),
  chatList: chatList,
  avatarImage: new AvatarImage({
    src: '/assets/images/noimage.jpeg',
    alt: 'image',
    width: '100',
    height: '100',
    attr: {
      class: 'user-info__avatar',
    },
  }),
  userName: 'userName',
  openMenuButton: new Button({
    text: 'Открыть меню',
  }),
  chatContent: chatContent,
  sendMessageForm: new SendMessageForm(),
});

const mainLayout = new MainLayout({
  body: chatPage,
});

window.onload = () => {
  const chatBody = document.querySelector('._chat-body__content');

  if (chatBody) {
    chatBody.scrollTo(0, chatBody.scrollHeight);
  }
};

renderDOM('#app', mainLayout);
