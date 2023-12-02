import set from '../helpers/set';
import { EventBus } from './eventBus';
import { IUserInfo } from '../types/user';
import { Router } from './router';
import { IChat, ICurrentChat } from '../types/chat';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IStore {
    isLoading: boolean,
    isFetchUser: boolean,
    user: IUserInfo | null,
    router: Router | null,
    allChats: IChat[],
    currentChat: ICurrentChat | null
}

class Store extends EventBus {
    private state:IStore = {
        isLoading: false,
        isFetchUser: false,
        user: null,
        router: null,
        allChats: [],
        currentChat: null
    };

    public getState() {
        return this.state;
    }


    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    };
}


export default new Store();
