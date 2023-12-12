import { expect } from 'chai';
import { HTTPTransport } from './fetch';
import { createSandbox, SinonStub } from 'sinon';

describe('Тесты HTTPTransport', () => {
    const sandbox = createSandbox();
    let request: SinonStub<any>;

    beforeEach(() => {
        request = sandbox.stub(HTTPTransport, 'request' as keyof typeof HTTPTransport).callsFake((...options) => {
            return Promise.resolve(options);
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Корректный URL при GET запросе с параметрами', async () => {
        await HTTPTransport.get('/endpoint', { data: { a: 1, b: 2 } });
        expect(request).calledWithMatch('/endpoint?a=1&b=2', { data: { a: 1, b: 2 }, method: 'GET' });
    });

    it('Корректный POST запрос', async () => {
        const requestData = { a: 1 };
        await HTTPTransport.post('/endpoint', { data: requestData });
        expect(request).calledWithMatch('/endpoint', { data: { a: 1 }, method: 'POST' });
    });

    it('Корректный PUT запрос', async () => {
        const requestData = { a: 1 };
        await HTTPTransport.put('/endpoint', { data: requestData });
        expect(request).calledWithMatch('/endpoint', { data: { a: 1 }, method: 'PUT' });
    });

    it('Корректный DELETE запрос', async () => {
        const requestData = { a: 1 };
        await HTTPTransport.delete('/endpoint', { data: requestData });
        expect(request).calledWithMatch('/endpoint', { data: { a: 1 }, method: 'DELETE' });
    });
});
