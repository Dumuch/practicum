import { IUserInfo } from './user';

export interface IChat {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | string;
    title: string;
    unread_count: number;
}

export interface ICurrentChatItems extends Omit<IChat, 'last_message'> {
    last_message: {
        user: Omit<IUserInfo, 'display_name' | 'id'>,
        time: string;
        content: string;
    } | null
}

export interface ICurrentChat  {
    chatId: number;
    users: Omit<IUserInfo, 'display_name'>[],
    items: ICurrentChatItems[]
}
