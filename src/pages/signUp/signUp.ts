import './signUp.scss';

import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout';
import { DefaultModal } from '../../components/modals/defaultModal';
import { RegistrationForm } from '../../components/forms/registrationForm';

//language=hbs
const pageTemplate = `
  {{{modal}}}
`;

class SignUpPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}

const modal = new DefaultModal({
  title: 'Регистрация',
  attr: {
    class: 'sign-up__modal',
  },
  body: new RegistrationForm(),
});

const signInPage = new SignUpPage('div', {
  attr: {
    class: 'container',
  },
  modal: modal,
});

const mainLayout = new MainLayout({
  body: signInPage,
});

renderDOM('#app', mainLayout);
