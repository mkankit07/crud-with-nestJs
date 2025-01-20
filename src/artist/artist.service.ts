import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  findArtist(userId: number): Promise<Artist> {
    return this.artistRepository.findOneBy({ user: { id: userId } });
  }
}
