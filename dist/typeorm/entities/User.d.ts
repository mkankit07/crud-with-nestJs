import { Profile } from './Profile';
export declare class User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    authStrateg: string;
    profile: Profile;
}
