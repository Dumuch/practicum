import './styles.scss';
import { Block, BlockProps } from '../../../libs/block';

//language=hbs
const template = `
    <input {{#if disabled }}disabled{{/if}} class="input search-input" name="{{name}}" placeholder="{{placeholder}}"
           type="{{#if type }}{{type}}{{else}}text{{/if}}" autocomplete="{{autocomplete}}" value="{{value}}">
    <div class="search-input__label">
        <svg>
            <use
                    xlink:href="/assets/images/fa-solid.svg#magnifying-glass">
            </use>
        </svg>
        <span>{{label}}</span>
    </div>
`;

export class SearchInput extends Block {
    constructor(props: BlockProps = {}) {
        super('label', {
            ...props,
            attr: {
                class: `wrapper-search-input ${props?.attr?.class ?? ''}`,
            },
        });
    }
    render(): Node {
        return this.compile(template);
    }
}
