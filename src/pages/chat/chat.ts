import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import { AvatarImage } from '../../components/images/avatarImage';
import { Button } from '../../components/buttons/defaultButton';
import { chatContent } from '../../widgets/chatContent';
import './styles.scss';
import  SendMessageForm  from '../../components/forms/sendMessageForm';
import { IStore } from '../../libs/store';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import ChatSidebar from '../../widgets/chatSidebar';
import { DefaultModal } from '../../components/modals/defaultModal';
import ChatSettings from '../../widgets/chatSettings';
import { ChatController } from '../../controllers/chatController';

//language=hbs
const pageTemplate = `
    {{{chatSidebar}}}

    <div class='chat-body'>
        {{#if currentChat}}
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
        {{else}}
            <div class='chat-body__header'>
                <p>Выберите чат</p>
            </div>
        {{/if}}

    </div>

    {{{settingsChatModal}}}
`;

class ChatPage extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'chat-container',
            },
            chatSidebar: new ChatSidebar(),
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
                attr: {
                    type: 'button',
                },
                events: {
                    click: async (e) => {
                        e.preventDefault();
                        await ChatController.getUsersCurrentChat(Number(this.props.currentChat!.chatId))
                        this._children['settingsChatModal'].setProps({ isVisible: true });
                    },
                },
            }),
            chatContent: chatContent,
            sendMessageForm: new SendMessageForm(),
            settingsChatModal: new DefaultModal({
                title: 'Настройки чата',
                attr: {
                    class: 'settings-chat-modal',
                },
                isVisible: false,
                body: new ChatSettings(),
            })
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
