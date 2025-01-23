import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post()
  @UseGuards(ArtistJwtGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createSong: CreateSongDTO, @Req() req): Promise<Song> {
    console.log(req.user);
    return this.songService.create(createSong);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songService.paginate({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.songService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songService.deleteOne(id);
  }

  @Put(':id')
  updateSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDto);
  }
}
