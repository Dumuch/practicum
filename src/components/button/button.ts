//language=hbs
import './button.scss';
import { Block, BlockProps } from '../../libs/block';

const template = `{{{text}}}`;

export class Button extends Block {
  constructor(props: BlockProps = {}) {
    super('button', {
      attr: {
        class: 'button',
        type: 'button',
      },
      ...props,
    });
  }
  render(): Node {
    return this.compile(template);
  }
}
