import { EventBus } from './eventBus';
import Handlebars, { log } from 'handlebars';

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
    private _children: Record<string, Block> = {}

    constructor(tagName: string = 'div', props: Record<string, any> = {}, template: string, children: Record<string, Block>[] = []) {
        const eventBus = new EventBus();

        if (children) {
            children.forEach(child => {
                this._children = { ...this._children, ...child }
            })
        }
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
        const dom = document.createElement('div');
        dom.innerHTML = this._templateFunction(this.props);

        const virtualElement = dom.querySelector(this._meta.tagName);
        if (this._element && virtualElement) {
            for (let i = 0; i < virtualElement.attributes.length; i++) {
                const attribute = virtualElement.attributes[i];
                this._element.setAttribute(attribute.name, attribute.value);
            }
            this._element.innerHTML = virtualElement.innerHTML;
        } else if (this._element) {
            this._element.innerHTML = this._templateFunction(this.props);
        }

        for (const childName in this._children) {
            if (this._children.hasOwnProperty(childName)) {
                const child = this._children[childName];
                child._render();
                const childElement = child.getContent();
                if (childElement) {
                    let replaceElement = this._element.querySelector('#' + childName);
                    let isTopLevel = false

                    if (!replaceElement) {
                        isTopLevel = true
                        replaceElement = this._element

                    };


                    const bodyClass = replaceElement.getAttribute('data-body-class')
                    if (bodyClass) {
                        const children = Array.from(replaceElement.children);
                        children.forEach(child => {
                            childElement.querySelector('.' + bodyClass).appendChild(child);
                        });
                    }
                    if (isTopLevel) {
                        document.querySelector('#app').append(childElement, replaceElement);
                    } else {
                        replaceElement.parentNode.replaceChild(childElement, replaceElement);

                    }
                }
            }
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

    setChild(tagName: string, child: Block) {
        console.log('tagName', tagName)
        this._children[tagName] = child;
    }
}
