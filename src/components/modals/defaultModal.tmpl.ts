import './defaultModal.scss';
import { Block } from '../../libs/block';

//language=hbs
const template = `
    <div class="modal {{class}}">
        <span class="modal__title">{{title}}</span>
        <div class="modal__body">
           {{body}}
        </div>
    </div>`


export class DefaultModal extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, template);
    }
}
