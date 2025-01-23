import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ArtistModule } from './artist/artist.module';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { validate } from '../env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[".env"],
      isGlobal: true,
      load: [configuration],
      validate:validate
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    AuthModule,
    UserModule,
    PlaylistModule,
    ArtistModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource:DataSource){
    console.log("dbName : " , dataSource.driver.database);
    
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes("songs") // option no 1

    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path:"songs",
    //   method:RequestMethod.POST
    // }) // option no 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
