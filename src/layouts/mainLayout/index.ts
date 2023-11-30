import { Block, BlockProps } from '../../libs/block';
import { headerNavigations } from '../../components/navigations/headerNavigations';

//language=hbs
const template = `
    <header>
        <nav class="site-nav">
            {{{navigation}}}
        </nav>
    </header>

    <main>
        {{{body}}}
    </main>
`;

export class MainLayout extends Block {
    constructor(props: BlockProps = {}) {
        super('div', {
            attr: {
                class: 'layout',
            },
            navigation: headerNavigations,
            ...props,
        });
    }

    render(): Node {
        return this.compile(template);
    }
}
