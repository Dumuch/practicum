//language=hbs
import './styles.scss';
import { Block, BlockProps } from '../../../libs/block';

const template = `
    <span class="input__label">{{label}}</span>
    <input {{#if disabled }}disabled{{/if}} class="input" name="{{name}}" placeholder="{{placeholder}}"
           type="{{#if type }}{{type}}{{else}}text{{/if}}" autocomplete="{{autocomplete}}" value="{{value}}">
`;

export class DefaultInput extends Block {
  constructor(props: BlockProps = {}) {
    super('label', {
      ...props,
      attr: {
        class: `wrapper-input ${props?.attr?.class ?? ''}`,
      },
    });
  }
  render(): Node {
    return this.compile(template);
  }
}
