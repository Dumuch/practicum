import { HTTPTransport } from '../libs/fetch';

export class ChatAPI extends HTTPTransport {
    static async getAll() {
        const res = await this.get('/chats');
        return this.checkResponse(res);
    }

    static async create() {
        const res = await this.post('/chats', { data: { title: new Date().toISOString() } });
        return this.checkResponse(res);
    }

    static async getCurrentChatById(id: number) {
        const res = await this.get(`/chats/${id}/common`);
        return this.checkResponse(res);
    }

    static async addUsers(ids: number[], chatId: string) {
        const res = await this.put('/chats/users', { data: { users: ids, chatId } });
        return this.checkResponse(res);
    }

    static async getUsersCurrentChat(chatId: number) {
        const res = await this.get(`/chats/${chatId}/users`);
        return this.checkResponse(res);
    }

    static async deleteUsers(ids: number[], chatId: string) {
        const res = await this.delete('/chats/users', { data: { users: ids, chatId } });
        return this.checkResponse(res);
    }

    static async remove(chatId: number) {
        const res = await this.delete('/chats', { data: { chatId } });
        return this.checkResponse(res);
    }

    static async getToken(chatId: number) {
        const res = await this.post(`/chats/token/${chatId}`);
        return this.checkResponse(res);
    }
}
