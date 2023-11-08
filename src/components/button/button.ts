//language=hbs
import './button.scss';
import { Block } from '../../libs/block';

const template = `<button class="button {{class}}" type="{{#if type }}{{type}}{{else}}button{{/if}}">{{text}}</button>`

export class Button extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, template);
    }
}
