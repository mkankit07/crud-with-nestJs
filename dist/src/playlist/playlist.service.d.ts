import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/user/user.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';
export declare class PlaylistService {
    private playListRepo;
    private songsRepo;
    private userRepo;
    constructor(playListRepo: Repository<Playlist>, songsRepo: Repository<Song>, userRepo: Repository<User>);
    create(playListDTO: CreatePlayListDto): Promise<Playlist>;
}
