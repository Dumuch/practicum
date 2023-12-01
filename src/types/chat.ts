import { IUserInfo } from './user';

export interface IChat {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | string;
    title: string;
    unread_count: number;
}

export interface ICurrentChat extends Omit<IChat, 'last_message'> {
    last_message: {
        user: Omit<IUserInfo, 'display_name' | 'id'>,
        time: string;
        content: string;
    } | null
}
