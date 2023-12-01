import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import { AvatarImage } from '../../components/images/avatarImage';
import { Button } from '../../components/buttons/defaultButton';
import { chatContent } from '../../widgets/chatContent';
import './styles.scss';
import { SendMessageForm } from '../../components/forms/sendMessageForm';
import { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import ChatSidebar from '../../widgets/chatSidebar';

//language=hbs
const pageTemplate = `
    {{{ChatSidebar}}}

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
    constructor() {
        super('div', {
            attr: {
                class: 'chat-container',
            },
            ChatSidebar: new ChatSidebar(),

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
    }
    render() {
        return this.compile(pageTemplate);
    }
}


function mapUserToProps(state:IStore) {
    return {
        router: state.router,
        currentChat: state.currentChat,
    };
}
const ChatPageHOC = connectStoreHOC(mapUserToProps)(ChatPage);


export const mainLayout = () => new MainLayout({
    body: new ChatPageHOC(),
});

window.onload = () => {
    const chatBody = document.querySelector('._chat-body__content');

    if (chatBody) {
        chatBody.scrollTo(0, chatBody.scrollHeight);
    }
};
