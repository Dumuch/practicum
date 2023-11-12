import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout';

//language=hbs
const pageTemplate = `
    <p>Главная страница</p>
`;

class IndexPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}
const indexPage = new IndexPage('div', {
  attr: {
    class: 'container',
  },
});

const mainLayout = new MainLayout({
  body: indexPage,
});

renderDOM('#app', mainLayout);
