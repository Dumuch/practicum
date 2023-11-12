import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout';
import './profile.scss';
import { ProfileForm } from '../../components/forms/profileForm';
import { AvatarImage } from '../../components/images/avatarImage';
import { Link } from '../../components/links/defaultLink';
import { appRoutes } from '../../constants/routes';

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
    </div>
`;

class ProfilePage extends Block {
    render() {
        return this.compile(pageTemplate);
    }
}

const profilePage = new ProfilePage('div', {
    attr: {
        class: 'container',
    },
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
    changeProfileLink: new Link({
        attr: {
            class: 'profile-settings__link',
            href: appRoutes.profile,
        },
        label: 'Изменить данные',
    }),
    changePasswordLink: new Link({
        attr: {
            class: 'profile-settings__link',
            href: appRoutes.profile,
        },
        label: 'Изменить пароль',
    }),
    exitLink: new Link({
        attr: {
            class: 'link_alert profile-settings__link',
            href: appRoutes.profile,
        },
        label: 'Выйти',
    }),
});

const mainLayout = new MainLayout({
    body: profilePage,
});

renderDOM('#app', mainLayout);
