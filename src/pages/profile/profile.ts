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

//language=hbs
const pageTemplate = `
    <div class="profile-settings">
        <div class="profile-settings__header">
            <div class="profile-settings__avatar-wrapper">
                {{{avatarImage}}}
                <div class="profile-settings__avatar-hover _open-avatar-form-modal">
                    Поменять аватар
                </div>
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
        });
    }

    render() {
        if (this.props.user) {
            this._children['avatarImage'].setProps({
                src: this.props.user.avatar ? appConstants.baseUrl + '/resources/' + this.props.user.avatar : '',
            });
        }
        return this.compile(pageTemplate);
    }

    async componentDidMount() {
        super.componentDidMount();
        if (!this.props.user && !this.props.isLoading) {
            const res = await UserController.getUserInfo();
            document.querySelector('._open-avatar-form-modal')?.addEventListener('click', () => {
                this._children['avatarFormModal'].setProps({ isVisible: true });
            });
            if (!res) {
                this.props.router?.go(appRoutes.signIn);
            }
        }
    }
}

function mapUserToProps(state: IStore) {
    return {
        isLoading: state.isLoading,
        user: state?.user,
        router: state.router,
    };
}

const ProfilePagePageHOC = connectStoreHOC(mapUserToProps)(ProfilePage);

export const mainLayout = () =>
    new MainLayout({
        body: new ProfilePagePageHOC(),
    });
