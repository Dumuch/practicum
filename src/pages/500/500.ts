import { Block } from '../../libs/block';
import { MainLayout } from '../../layouts/mainLayout';

//language=hbs
const pageTemplate = `
    <p>500. Упс...</p>
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

export const mainLayout = () =>
    new MainLayout({
        body: errorPage,
    });
