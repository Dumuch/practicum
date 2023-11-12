//language=hbs
import './button.scss';
import { Block, BlockProps } from '../../libs/block';

const template = `{{{text}}}`;

export class Button extends Block {
  constructor(props: BlockProps = {}) {
    const className = props?.attr?.class ? `button ${props.attr.class}` : 'button';

    let currentProps = {
      attr: {
        class: className,
        type: 'button',
      },
    };

    if (props.attr) {
      currentProps = {
        attr: {
          ...currentProps.attr,
          ...props.attr,
        },
      };
    }

    super('button', {
      ...props,
      ...currentProps
    });
  }
  render(): Node {
    return this.compile(template);
  }
}
