import './signUp.scss';

import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import { DefaultModal } from '../../components/modals/defaultModal';
import RegistrationForm  from '../../components/forms/registrationForm';
import { appRoutes } from '../../constants/routes';
import { UserController } from '../../controllers/userContoller';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { IStore } from '../../libs/store';

//language=hbs
const pageTemplate = `
    {{{modal}}}
`;

class SignUpPage extends Block {
    render() {
        return this.compile(pageTemplate);
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.user) {
            this.props.router?.go(appRoutes.chats)
        } else {
            UserController.getUserInfo().then(() => {
                if (this.props.user) {
                    this.props.router?.go(appRoutes.chats)
                }
            });
        }
    }
}
function mapUserToProps(state: IStore) {
    return {
        router: state.router,
        user: state?.user,
    };
}
const SignUpPageHOC = connectStoreHOC(mapUserToProps)(SignUpPage)


const modal = new DefaultModal({
    title: 'Регистрация',
    attr: {
        class: 'sign-up__modal',
    },
    body: new RegistrationForm(),
});

const signInPage = new SignUpPageHOC('div', {
    attr: {
        class: 'container',
    },
    modal: modal,
});

export const mainLayout = () => new MainLayout({
    body: signInPage,
});

