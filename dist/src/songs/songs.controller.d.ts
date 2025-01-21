import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class SongsController {
    private songService;
    constructor(songService: SongsService);
    create(createSong: CreateSongDTO, req: any): Promise<Song>;
    findAll(page?: number, limit?: number): Promise<Pagination<Song>>;
    findOne(id: number): Promise<Song>;
    deleteOne(id: number): Promise<DeleteResult>;
    updateSong(id: number, updateSongDto: UpdateSongDTO): Promise<UpdateResult>;
}
