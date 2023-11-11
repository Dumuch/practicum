import { Block } from '../../libs/block';
import renderDOM from '../../helpers/renderDOM';
import { MainLayout } from '../../layouts/mainLayout/mainLayout.tmpl';

//language=hbs
const pageTemplate = `
    <p>Страница чата</p>
`;

class ChatPage extends Block {
  render() {
    return this.compile(pageTemplate);
  }
}
const chatPage = new ChatPage('div', {
  attr: {
    class: 'container',
  },
});

const mainLayout = new MainLayout({
  body: chatPage,
});

renderDOM('#app', mainLayout);
