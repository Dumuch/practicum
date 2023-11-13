import './styles.scss';
import { Block, BlockProps } from '../../../libs/block';

//language=hbs
const template = `
    <span class="modal__title">{{{title}}}</span>
    <div class="modal__body">
        {{{body}}}
    </div>
`;

export class DefaultModal extends Block {
    constructor(props: BlockProps = {}) {
        super('div', {
            ...props,
            attr: {
                class: `modal ${props?.attr?.class ?? ''}`,
            },
        });
    }

    render(): Node {
        return this.compile(template);
    }
}
