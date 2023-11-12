import { Block, BlockProps } from '../../../libs/block';
import "./styles.scss";

//language=hbs
const template = `
    <input {{#if disabled }}disabled{{/if}} class="input chat-input" name="{{name}}" placeholder="{{placeholder}}"
           type="{{#if type }}{{type}}{{else}}text{{/if}}" autocomplete="{{autocomplete}}" value="{{value}}">
`;

export class ChatInput extends Block {
  constructor(props: BlockProps = {}) {
    super('label', {
      ...props,
      attr: {
        class: `wrapper-chat-input ${props?.attr?.class ?? ''}`,
      },
    });
  }
  render(): Node {
    return this.compile(template);
  }
}
