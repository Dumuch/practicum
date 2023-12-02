import store from '../libs/store';
import { ChatAPI } from '../api/chatApi';

export class ChatController {
    public static async getAllChats() {
        store.set('isLoading', true);
        const data = await ChatAPI.getAll();
        store.set('isLoading', false);
        store.set('allChats', data);
        return data;
    }

    public static async createChat() {
        store.set('isLoading', true);
        const data = await ChatAPI.create();
        store.set('isLoading', false);
        return data;
    }

    public static async getCurrentChatById(id: number) {
        store.set('isLoading', true);
        const data = await ChatAPI.getCurrentChatById(id);
        store.set('isLoading', false);
        store.set('currentChat', { chatId: id, items: data });
        return data;
    }

    public static async addUsersToChat(ids: number[], chatId: string) {
        store.set('isLoading', true);
        const data = await ChatAPI.addUsers(ids, chatId);
        store.set('isLoading', false);
        return data;
    }

    public static async getUsersCurrentChat(chatId: number) {
        store.set('isLoading', true);
        const data = await ChatAPI.getUsersCurrentChat(chatId);
        store.set('isLoading', false);
        store.set('currentChat', {...store.getState().currentChat, users: data });

        return data;
    }

    public static async deleteUsersCurrentChat(ids: number[], chatId: string) {
        store.set('isLoading', true);
        const data = await ChatAPI.deleteUsers(ids, chatId);
        store.set('isLoading', false);
        return data;
    }

}
