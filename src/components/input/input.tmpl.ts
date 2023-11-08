//language=hbs
import './input.scss';

export default `<label class="wrapper-input {{class}}">
    <span class="input__label">{{label}}</span>
    <input {{#if disabled }}disabled{{/if}} class="input" name="{{name}}" placeholder="{{placeholder}}"
           type="{{#if type }}{{type}}{{else}}text{{/if}}" autocomplete="{{autocomplete}}" value="{{value}}">
</label>`
