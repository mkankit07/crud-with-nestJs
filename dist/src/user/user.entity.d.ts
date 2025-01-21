import { Playlist } from 'src/playlist/playlist.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    apikey: string;
    twoFASecret: string;
    enable2FA: boolean;
    playLists: Playlist[];
}
