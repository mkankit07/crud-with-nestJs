import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
export declare class ArtistService {
    private artistRepository;
    constructor(artistRepository: Repository<Artist>);
    findArtist(userId: number): Promise<Artist>;
}
