import { Block, BlockProps } from '../../libs/block';
import './link.scss';

//language=hbs
const template = `{{{label}}}`;

export class Link extends Block {
  constructor(props: BlockProps = {}) {
    const className = props?.attr?.class ? `link ${props.attr.class}` : 'link';

    let currentProps = {
      attr: {
        class: className,
      },
    };

    if (props.attr) {
      currentProps = {
        attr: {
          ...props.attr,
          ...currentProps.attr,
        },
      };
    }

    super('a', {
      ...props,
      ...currentProps,
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
