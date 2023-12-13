import { IUserInfo } from './user';

export interface IChat {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: {
        user: Omit<IUserInfo, 'display_name' | 'id'>;
        time: string;
        content: string;
    };
    title: string;
    unread_count: number;
}

export interface ICurrentChatItem {
    chat_id: number;
    content: string;
    file: string | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export interface ICurrentChat {
    chatId: number;
    users: Omit<IUserInfo, 'display_name'>[];
    items: ICurrentChatItem[];
    token?: string;
}

export interface ISendMessage {
    message: string;
}

export interface IUpdateChatAvatar {
    avatar: File;
}
