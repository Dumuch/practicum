import { Block, BlockProps } from '../../../libs/block';
import './styles.scss';

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
                class: `wrapper-chat-input ${props?.attr?.class ?? ''} ${
                    props?.error ? 'wrapper-chat-input_error' : ''
                }`,
            },
        });
    }

    addEvents() {
        Object.keys(this._events).forEach(eventName => {
            const input = this.getContent().querySelector('input');

            input && input.addEventListener(eventName, this._events[eventName]);
        });
    }

    removeEvents() {
        Object.keys(this._events).forEach(eventName => {
            const input = this.getContent().querySelector('input');
            input && input.removeEventListener(eventName, this._events[eventName]);
        });
    }

    render(): Node {
        return this.compile(template);
    }
}
