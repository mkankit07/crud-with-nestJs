import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      database: 'spotify-clone',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      // entities: ['src/**/*.entity.ts'],
      entities: [Song,User, Artist],
      synchronize: true,
    }),
    SongsModule,
    AuthModule,
    UserModule
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
