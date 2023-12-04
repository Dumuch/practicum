import './styles.scss';
import { Block, BlockProps } from '../../../libs/block';

//language=hbs
const template = `
    <div class='modal'>
        <span class="modal__title">{{{title}}}</span>
        <div class="modal__body">
            {{{body}}}
        </div>
    </div>
`;

export class DefaultModal extends Block {
    constructor(props: BlockProps = {}) {
        super('div', {
            ...props,
            attr: {
                class: `modal-wrapper ${props?.attr?.class ?? ''}`,
            },
        });
    }

    render(): Node {
        if (this.props.isVisible) {
            const closeModal = () => {
                this.element?.classList.remove('modal_open');
                document.removeEventListener('closemodal', closeModal);
            };
            this.setProps({ isVisible: false });

            this.props.attr.class = this.props.attr.class + ' modal_open';
            document.addEventListener('closemodal', closeModal);
        }
        return this.compile(template);
    }
}
