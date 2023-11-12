import './signIn.scss';
import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout';
import { DefaultModal } from '../../components/modals/defaultModal';
import { AuthorizationForm } from '../../components/forms/authorizationForm';

//language=hbs
const pageTemplate = `
  {{{modal}}}
`;

class SignInPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}

const modal = new DefaultModal({
  title: 'Авторизация',
  attr: {
    class: 'sign-in__modal',
  },
  body: new AuthorizationForm(),
});

const signInPage = new SignInPage('div', {
  attr: {
    class: 'container',
  },
  modal: modal,
});

const mainLayout = new MainLayout({
  body: signInPage,
});

renderDOM('#app', mainLayout);
