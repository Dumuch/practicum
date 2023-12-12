import { expect } from 'chai';
import { Block } from './block';
import { JSDOM } from 'jsdom';

class TestBlock extends Block {
    getProps() {
        return this.props;
    }
}

describe('Тестирование компонента Block', () => {
    let block: TestBlock;

    beforeEach(() => {
        block = new TestBlock('div', { attr: { class: 'test-class' } });
    });

    it('Корректно создается', () => {
        expect(block).to.be.an.instanceOf(Block);
        expect(block.element).to.exist;
        expect(block.getProps().attr.class).to.equal('test-class');
    });

    it('Корректно рендерится', () => {
        const content = block.render();
        expect(content).to.exist;
        expect((content as any).tagName).to.equal('DIV'); // Type assertion
    });

    it('Пропсы обновляются', () => {
        const newProps = { attr: { class: 'updated-class' } };
        block.setProps(newProps);
        expect(block.getProps().attr.class).to.equal('updated-class');
    });

    it('Шаблонизатор Handlebars корректно компилирует строку в HTML документ', () => {
        const template = '<div>{{attr.class}}</div>';
        const compiled = block.compile(template);
        expect(compiled).to.exist;
    });
});
