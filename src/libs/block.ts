import { EventBus } from './eventBus';
import Handlebars from 'handlebars';

export class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    private _element: HTMLElement | null = null;
    private _meta: { tagName: string | null; props: Record<string, any> } | null = null;
    protected props: Record<string, any>;
    private eventBus: () => EventBus;
    private _templateFunction: HandlebarsTemplateDelegate;


    constructor(tagName: string = 'div', props: Record<string, any> = {}, template: string) {
        const eventBus = new EventBus();

        this._templateFunction = Handlebars.compile(template)

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;

        this._registerEvents(this.eventBus());
        this.eventBus().emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return true;
    }

    setProps = (nextProps: Record<string, any>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду'
        console.log(this._templateFunction(this.props))
        if (this._element) {
            this._element.innerHTML = this._templateFunction(this.props);
        }
    }


    render(): string {
        return this.element.innerHTML;
    }

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props: Record<string | symbol, any>) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
