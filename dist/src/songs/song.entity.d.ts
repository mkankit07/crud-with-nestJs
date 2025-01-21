import { Artist } from 'src/artist/artist.entity';
import { Playlist } from 'src/playlist/playlist.entity';
export declare class Song {
    id: number;
    title: string;
    releasedDate: Date;
    duration: Date;
    lyrics: string;
    artists: Artist[];
    playList: Playlist;
}
