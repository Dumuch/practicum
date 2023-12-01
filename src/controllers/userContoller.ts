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
        const data = UserAPI.create(values);
        store.set('isLoading', false);
        return data;
    }

    public static async updateUserInfo(values: IUpdateUserInfo) {
        store.set('isLoading', true);
        const data = await UserAPI.updateInfo(values);
        store.set('isLoading', false);
        store.set('user', data);
        return data;
    }

    public static async updateUserPassword(values: IUpdateUserPassword) {
        store.set('isLoading', true);
        const data = UserAPI.updatePassword(values);
        store.set('isLoading', false);
        return data;
    }

    public static async updateUserAvatar(value: IUpdateUserAvatar) {
        store.set('isLoading', true);
        const data = UserAPI.updateAvatar(value);
        store.set('isLoading', false);
        return data;
    }

    public static async signIn(values: ISignInUser) {
        store.set('isLoading', true);
        const data = await UserAPI.signIn(values);
        store.set('isLoading', false);
        return data;
    }

    public static async getUserInfo() {
        store.set('isLoading', true);
        const data = await UserAPI.getInfo();
        store.set('isLoading', false);
        store.set('user', data);
        return data;
    }

    public static async logOut() {
        store.set('isLoading', true);
        await UserAPI.logOut();
        store.set('isLoading', false);
        store.set('user', null)
    }


    public static async findUser(login: string) {
        store.set('isLoading', true);
        const data = await UserAPI.findByLogin(login);
        store.set('isLoading', false);
        return data as IUserInfo[]
    }
}
