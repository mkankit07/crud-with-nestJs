"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const song_entity_1 = require("./song.entity");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const artist_entity_1 = require("../artist/artist.entity");
let SongsService = class SongsService {
    constructor(songsRepository, artistsRepository) {
        this.songsRepository = songsRepository;
        this.artistsRepository = artistsRepository;
    }
    async create(createSong) {
        const song = new song_entity_1.Song();
        song.title = createSong.title;
        song.releasedDate = createSong.releasedDate;
        song.duration = createSong.duration;
        song.lyrics = createSong.lyrics || '';
        const artists = await this.artistsRepository.findBy({
            user: (0, typeorm_1.In)(createSong.artists),
        });
        song.artists = artists;
        return await this.songsRepository.save(song);
    }
    findAll() {
        return this.songsRepository.find();
    }
    findOne(id) {
        return this.songsRepository.findOne({ where: { id } });
    }
    deleteOne(id) {
        return this.songsRepository.delete({ id });
    }
    update(id, recordToUpdate) {
        return this.songsRepository.update(id, recordToUpdate);
    }
    async paginate(options) {
        const queryBuilder = this.songsRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(song_entity_1.Song)),
    __param(1, (0, typeorm_2.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map