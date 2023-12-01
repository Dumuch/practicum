import { HTTPTransport } from '../libs/fetch';

export class ChatAPI extends HTTPTransport {

    static async getAll() {
        const res = await this.get('/chats');
        if (res.status === 200) {
            return res.response;
        }
        return null;
    }

    static async create() {
        const res = await this.post('/chats', { data: { title: new Date().toISOString() } });
        if (res.status === 200) {
            return res.response;
        }
        return null;
    }

    static async getCurrentChatById(id: number) {
        const res = await this.get(`/chats/${id}/common`);
        if (res.status === 200) {
            return res.response;
        }
        return null;
    }

    static async addUsers(ids: number[], chatId:string){
        const res = await this.put('/chats/users', { data: { users: ids, chatId } });
        if (res.status === 200) {
            return res.response;
        }
        return null;
    }
}
