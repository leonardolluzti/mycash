export interface User{
    id?: number;
    username: string;
    password: string;
    admin: boolean;
}
export interface Authentication{
    username: string;
    password: string;
}