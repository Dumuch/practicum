import { HTTPTransport } from '../libs/fetch';
import { ICreateUser, ISignInUser, IUpdateUserAvatar, IUpdateUserInfo, IUpdateUserPassword } from '../types/user';

export class UserAPI extends HTTPTransport {
    static async create(values: ICreateUser) {
        const res = await this.post('/auth/signup', { data: values });
        if (res.status === 200) {
            return true
        }
        return null
    }

    static async updateInfo(values: IUpdateUserInfo) {
        const res = await this.put('/user/profile', { data: values });
        if (res.status === 200) {
            return res.response
        }
        return null
    }

    static async updatePassword(values: IUpdateUserPassword) {
        const res = await this.put('/user/password', { data: values });
        if (res.status === 200) {
            return true
        }
        return null
    }

    static async updateAvatar(value: IUpdateUserAvatar) {
        const formData = new FormData();
        formData.append('avatar', value.avatar)
        const res = await this.put('/user/profile/avatar', { data: formData });
        if (res.status === 200) {
            return true
        }
        return null
    }

    static async signIn(values: ISignInUser) {
        const res = await this.post('/auth/signin', { data: values });
        if (res.status === 200) {
            return true
        }
        return null;
    }


    static async getInfo() {
        const res = await this.get('/auth/user')
        if (res.status === 200) {
            return res.response
        }
        return null;
    }

    static async logOut() {
        const res = await this.post('/auth/logout');
        return res.response;
    }

}
