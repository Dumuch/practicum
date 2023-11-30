import './signIn.scss';
import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';
import { DefaultModal } from '../../components/modals/defaultModal';
import AuthorizationForm from '../../components/forms/authorizationForm';
import { UserController } from '../../controllers/userContoller';
import connectStoreHOC from '../../helpers/connectStoreHOC';
import { appRoutes } from '../../constants/routes';
import { IStore } from '../../libs/store';

//language=hbs
const pageTemplate = `
    {{{modal}}}
`;

class SignInPage extends Block {
    render() {
        return this.compile(pageTemplate);
    }
    componentDidMount() {
        super.componentDidMount();
        if (this.props.user) {
            this.props.router?.go(appRoutes.chats)
        } else {
            !this.props.isLoading && UserController.getUserInfo().then(() => {
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
        isLoading: state.isLoading,
        user: state.user,
    };
}

const SignInPageHOC = connectStoreHOC(mapUserToProps)(SignInPage)
const modal = new DefaultModal({
    title: 'Авторизация',
    attr: {
        class: 'sign-in__modal',
    },
    body: new AuthorizationForm(),
});


const signInPage = new SignInPageHOC('div', {
    attr: {
        class: 'container',
    },
    modal: modal,
});

export const mainLayout = () => new MainLayout({
    body: signInPage,
});

