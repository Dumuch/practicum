import { Block } from '../../libs/block';
import './link.scss';

//language=hbs
const template = `<a class="link {{class}}" href="{{href}}">{{label}}</a>`

export class Link extends Block {
    constructor(props: Record<string, any>) {
        super('a', props, template);
    }
}
