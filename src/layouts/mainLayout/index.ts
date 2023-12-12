import { Block, BlockProps } from '../../libs/block';

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
            ...props,
        });
    }

    render(): Node {
        return this.compile(template);
    }
}
