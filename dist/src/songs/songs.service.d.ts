import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';
export declare class SongsService {
    private songsRepository;
    private artistsRepository;
    constructor(songsRepository: Repository<Song>, artistsRepository: Repository<Artist>);
    create(createSong: CreateSongDTO): Promise<Song>;
    findAll(): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    deleteOne(id: number): Promise<DeleteResult>;
    update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult>;
    paginate(options: IPaginationOptions): Promise<Pagination<Song>>;
}
