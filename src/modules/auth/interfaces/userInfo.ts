import type { User } from './user';

export interface UserInfo {
    user: User;
    idToken: string;
    refreshToken: string;
    userId: string;
}