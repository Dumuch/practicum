export interface IUserInfo {
    avatar?: string;
    display_name?: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

export interface ICreateUser {
    login: string;
    password: string;
    email: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    phone: string;
}

export interface IUpdateUserInfo {
    login: string;
    email: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    phone: string;
}

export interface IUpdateUserPassword {
    oldPassword: string;
    newPassword: string;
}

export interface ISignInUser {
    login: string;
    password: string;
}
