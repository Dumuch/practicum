import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import './profile.scss';
import ProfileForm from '../../components/forms/profileForm';
import { AvatarImage } from '../../components/images/avatarImage';
import { Link } from '../../components/links/defaultLink';
import { appRoutes } from '../../constants/routes';
import { Button } from '../../components/buttons/defaultButton';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { UserController } from '../../controllers/userContoller';
import { IStore } from '../../libs/store';
import PasswordForm from '../../components/forms/passwordForm';
import { DefaultModal } from '../../components/modals/defaultModal';
import AvatarForm from '../../components/forms/avatarFrom';
import { appConstants } from '../../constants/app';
import { Wrapper } from '../../components/wrapper';

//language=hbs
const pageTemplate = `
    <div class="profile-settings">
        <div class='profile-settings__link-to-chat'>
            « {{{linkToChat}}}
        </div>
        
        <div class="profile-settings__header">
            <div class="profile-settings__avatar-wrapper">
                {{{avatarImage}}}
                {{{wrapperTextAvatar}}}
            </div>
        </div>

        <div class="profile-settings__fields">
            {{{profileForm}}}
        </div>

        <div class="profile-settings__footer">
            {{{changeProfileLink}}}
            {{{changePasswordLink}}}
            {{{exitLink}}}
        </div>
        {{{avatarFormModal}}}
        {{{passwordFormModal}}}
    </div>
`;

const passwordFormModal = new DefaultModal({
    title: 'Смена пароля',
    attr: {
        class: 'change-password-modal',
    },
    isVisible: false,
    body: new PasswordForm(),
});

const avatarFormModal = new DefaultModal({
    title: 'Смена аватарки',
    attr: {
        class: 'change-avatar-modal',
    },
    isVisible: false,
    body: new AvatarForm(),
});

class ProfilePage extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'container',
            },
            passwordFormModal: passwordFormModal,
            avatarFormModal: avatarFormModal,
            profileForm: new ProfileForm(),
            avatarImage: new AvatarImage({
                src: '/assets/images/noimage.jpeg',
                alt: 'image',
                width: '200',
                height: '200',
                attr: {
                    class: 'profile-settings__avatar',
                },
            }),
            changeProfileLink: new Button({
                attr: {
                    form: 'profile-form',
                    class: 'button',
                    type: 'submit',
                },

                text: 'Сохранить данные',
            }),
            changePasswordLink: new Link({
                attr: {
                    class: 'profile-settings__link',
                    href: appRoutes.profile,
                },
                label: 'Изменить пароль',
                events: {
                    click: async e => {
                        e.preventDefault();
                        this._children['passwordFormModal'].setProps({ isVisible: true });
                    },
                },
            }),
            wrapperTextAvatar: new Wrapper('div', {
                attr: {
                    class: 'profile-settings__avatar-hover',
                },
                child: 'Поменять аватар',
                events: {
                    click: () => {
                        this._children['avatarFormModal'].setProps({ isVisible: true });
                    },
                },
            }),
            exitLink: new Link({
                attr: {
                    class: 'link_alert profile-settings__link',
                    href: appRoutes.profile,
                },
                label: 'Выйти',
                events: {
                    click: async e => {
                        e.preventDefault();
                        await UserController.logOut();
                        window.location.reload();
                    },
                },
            }),
            linkToChat: new Link({
                label: 'Обратно в Чат',
                attr: {
                    href: appRoutes.chats,
                    class: 'chat-sidebar__header-link',
                },
                events: {
                    click: e => {
                        e.preventDefault();
                        this.props.router?.go(appRoutes.chats);
                    },
                },
            }),
        });
    }

    render() {
        if (this.props.user?.avatar) {
            this._children['avatarImage'].setProps({
                src: appConstants.baseUrl + '/resources/' + this.props.user.avatar,
            });
        }
        return this.compile(pageTemplate);
    }

    async componentDidMount() {
        super.componentDidMount();
        if (!this.props.user && !this.props.isLoading) {
            const res = await UserController.getUserInfo();
            if (!res) {
                this.props.router?.go(appRoutes.signIn);
                return;
            }
        }
    }
}

function mapUserToProps(state: IStore) {
    return {
        isLoading: state.isLoading,
        user: state?.user,
        router: state.router,
        avatarImage: new AvatarImage({
            src: state.user?.avatar ?? '/assets/images/noimage.jpeg',
            alt: 'image',
            width: '200',
            height: '200',
            attr: {
                class: 'profile-settings__avatar',
            },
        }),
    };
}

const ProfilePagePageHOC = connectStoreHOC(mapUserToProps)(ProfilePage);

export const mainLayout = () =>
    new MainLayout({
        body: new ProfilePagePageHOC(),
    });
