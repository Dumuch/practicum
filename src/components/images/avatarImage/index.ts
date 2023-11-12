import { Block, BlockProps } from '../../../libs/block';
import './styles.scss';

//language=hbs

const template = `
    <img src="{{src}}" alt="{{alt}}" width="{{width}}" height="{{height}}">
`;

export class AvatarImage extends Block {
    constructor(props: BlockProps = {}) {
        super('div', {
            ...props,
            attr: {
                class: `wrapper-image-avatar ${props?.attr?.class ?? ''}`,
            },
        });
    }

    render(): Node {
        return this.compile(template);
    }
}
