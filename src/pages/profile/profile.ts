import { Block, BlockProps } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import './profile.scss';
import ProfileForm  from '../../components/forms/profileForm';
import { AvatarImage } from '../../components/images/avatarImage';
import { Link } from '../../components/links/defaultLink';
import { appRoutes } from '../../constants/routes';
import { Button } from '../../components/buttons/defaultButton';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { UserController } from '../../controllers/userContoller';
import { IStore } from '../../libs/store';
import PasswordForm from '../../components/forms/passwordForm';
import { DefaultModal } from '../../components/modals/defaultModal';
import AuthorizationForm from '../../components/forms/authorizationForm';

//language=hbs
const pageTemplate = `
    <div class="profile-settings">
        <div class="profile-settings__header">
            <div class="profile-settings__avatar-wrapper">
                {{{avatarImage}}}
                <div class="profile-settings__avatar-hover">
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

        {{{passwordFormModal}}}
    </div>
`;

const modal = new DefaultModal({
    title: 'Смена пароля',
    attr: {
        class: 'change-password-modal',
    },
    isVisible: false,
    body: new PasswordForm(),
});

class ProfilePage extends Block {
    constructor() {
        super('div', {
            attr: {
                class: 'container',
            },
            passwordFormModal: modal,
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
                    click: async (e) => {
                        e.preventDefault();
                        this._children['passwordFormModal'].setProps({isVisible: true})
                    }
                }
            }),
            exitLink: new Link({
                attr: {
                    class: 'link_alert profile-settings__link',
                    href: appRoutes.profile,
                },
                label: 'Выйти',
                events: {
                    click: async (e) => {
                        e.preventDefault();
                        await UserController.logOut();
                        window.location.reload();
                    }
                }
            }),
        });
    }
    render() {
        return this.compile(pageTemplate);
    }

    async componentDidMount() {
        super.componentDidMount();
        if (!this.props.user && !this.props.isLoading) {
            const res = await UserController.getUserInfo();
            if (!res) {
                this.props.router?.go(appRoutes.signIn)
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
const ProfilePagePageHOC = connectStoreHOC(mapUserToProps)(ProfilePage)

export const mainLayout = () => new MainLayout({
    body: new ProfilePagePageHOC,
});
