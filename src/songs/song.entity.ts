import { Artist } from 'src/artist/artist.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;  

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(()=>Artist, (artist)=>artist.songs,{cascade: true})
  @JoinTable({name:"songs_artists"})
  artists: Artist[];

  /**
   * Many songs can belong to playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
