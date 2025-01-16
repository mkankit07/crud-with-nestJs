import { Get, Injectable } from '@nestjs/common';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createSong: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = createSong.title;
    song.releasedDate = createSong.releasedDate;
    song.duration = createSong.duration;
    song.lyrics = createSong.lyrics || '';

    const artists = await this.artistsRepository.findBy({
      user: In(createSong.artists),
    });
    song.artists = artists;

    return await this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOne({ where: { id } });
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete({ id });
  }

  update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
