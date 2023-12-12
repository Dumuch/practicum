import store from '../libs/store';
import { UserAPI } from '../api/userApi';
import {
    ICreateUser,
    ISignInUser,
    IUpdateUserAvatar,
    IUpdateUserInfo,
    IUpdateUserPassword,
    IUserInfo,
} from '../types/user';

export class UserController {
    public static async createUser(values: ICreateUser) {
        store.set('isLoading', true);

        try {
            return UserAPI.create(values);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async updateUserInfo(values: IUpdateUserInfo) {
        store.set('isLoading', true);

        try {
            const data = await UserAPI.updateInfo(values);
            store.set('user', data);
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async updateUserPassword(values: IUpdateUserPassword) {
        store.set('isLoading', true);

        try {
            return UserAPI.updatePassword(values);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async updateUserAvatar(value: IUpdateUserAvatar) {
        store.set('isLoading', true);

        try {
            return UserAPI.updateAvatar(value);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async signIn(values: ISignInUser) {
        store.set('isLoading', true);

        try {
            return await UserAPI.signIn(values);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async getUserInfo() {
        store.set('isLoading', true);

        try {
            const data = await UserAPI.getInfo();
            store.set('user', data);
            return data;
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async logOut() {
        store.set('isLoading', true);

        try {
            await UserAPI.logOut();
            store.set('user', null);
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }

    public static async findUser(login: string) {
        store.set('isLoading', true);

        try {
            return (await UserAPI.findByLogin(login)) as IUserInfo[];
        } catch {
            return null;
        } finally {
            store.set('isLoading', false);
        }
    }
}
