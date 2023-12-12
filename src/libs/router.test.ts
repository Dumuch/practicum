import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox } from 'sinon';
import { Block } from './block';
import { Router } from './router';

use(sinonChai);

describe('Тестирование Router', () => {
    let sandbox: any;
    let router: Router;

    beforeEach(() => {
        sandbox = createSandbox();
        router = new Router('#app');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Роутер создается', () => {
        expect(router).to.be.an.instanceOf(Router);
    });

    it('В роутер корректно добавляются страницы и пути', () => {
        const blockStub = sandbox.stub();
        router.use('/home', blockStub);

        expect(router['routes']).to.have.lengthOf(1);
    });

    it('Когда переходим на страницу, то она отрисовывается', () => {
        const blockStub = sandbox.stub({
            show: () => {},
            hide: () => {},
            getContent: () => '<div></div>' as unknown as HTMLElement,
        } as Block);

        sandbox.stub(document, 'querySelector').returns(document.createElement('div'));
        sandbox.stub(Block.prototype, 'getContent').returns(document.createElement('div'));
        sandbox.stub(Block.prototype, 'show');
        sandbox.stub(Block.prototype, 'hide');

        router.use('/about', () => blockStub).start();

        router.go('/about');

        expect(blockStub.getContent).to.have.been.calledOnce;
    });

    it('Если путь не правильный, то отрабатывает компонент в методе error', () => {});
});
