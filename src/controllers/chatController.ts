import store from '../libs/store';
import { ChatAPI } from '../api/chatApi';

export class ChatController {
    public static async getAllChats() {
        store.set('isLoading', true);

        try {
            const data = await ChatAPI.getAll();
            store.set('allChats', data);
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async createChat() {
        store.set('isLoading', true);

        try {
            const data = await ChatAPI.create();
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async getCurrentChatById(id: number) {
        store.set('isLoading', true);

        try {
            const data = await ChatAPI.getCurrentChatById(id);
            store.set('currentChat', { ...store.getState().currentChat, chatId: id, items: [] });
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async addUsersToChat(ids: number[], chatId: string) {
        store.set('isLoading', true);

        try {
            return await ChatAPI.addUsers(ids, chatId);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async getUsersCurrentChat(chatId: number) {
        store.set('isLoading', true);

        try {
            const data = await ChatAPI.getUsersCurrentChat(chatId);
            store.set('currentChat', { ...store.getState().currentChat, users: data });
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async deleteUsersCurrentChat(ids: number[], chatId: string) {
        store.set('isLoading', true);

        try {
            return await ChatAPI.deleteUsers(ids, chatId);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async deleteChat(chatId: number) {
        store.set('isLoading', true);

        try {
            const data = await ChatAPI.remove(chatId);
            store.set('currentChat', null);
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async getChatToken(chatId: number) {
        store.set('isLoading', true);
        try {
            const data = await ChatAPI.getToken(chatId);
            store.set('currentChat', { ...store.getState().currentChat, token: data.token });
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }
}
