import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout/mainLayout.tmpl';

//language=hbs
const pageTemplate = `
    <p>404. Упс...</p>
`;

class ErrorPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}
const errorPage = new ErrorPage('div', {
  attr: {
    class: 'container',
  },
});

const mainLayout = new MainLayout({
  body: errorPage,
});

renderDOM('#app', mainLayout);
