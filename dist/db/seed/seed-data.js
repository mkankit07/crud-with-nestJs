"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const faker_1 = require("@faker-js/faker");
const uuid_1 = require("uuid");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../../src/user/user.entity");
const artist_entity_1 = require("../../src/artist/artist.entity");
const playlist_entity_1 = require("../../src/playlist/playlist.entity");
const seedData = async (manager) => {
    await seedUser();
    await seedArtist();
    await seedPlayLists();
    async function seedUser() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);
        const user = new user_entity_1.User();
        user.firstName = faker_1.faker.person.firstName();
        user.lastName = faker_1.faker.person.lastName();
        user.email = faker_1.faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = (0, uuid_1.v4)();
        await manager.getRepository(user_entity_1.User).save(user);
    }
    async function seedArtist() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);
        const user = new user_entity_1.User();
        user.firstName = faker_1.faker.person.firstName();
        user.lastName = faker_1.faker.person.lastName();
        user.email = faker_1.faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = (0, uuid_1.v4)();
        const artist = new artist_entity_1.Artist();
        artist.user = user;
        await manager.getRepository(user_entity_1.User).save(user);
        await manager.getRepository(artist_entity_1.Artist).save(artist);
    }
    async function seedPlayLists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);
        const user = new user_entity_1.User();
        user.firstName = faker_1.faker.person.firstName();
        user.lastName = faker_1.faker.person.lastName();
        user.email = faker_1.faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = (0, uuid_1.v4)();
        const playList = new playlist_entity_1.Playlist();
        playList.name = faker_1.faker.music.genre();
        playList.user = user;
        await manager.getRepository(user_entity_1.User).save(user);
        await manager.getRepository(playlist_entity_1.Playlist).save(playList);
    }
};
exports.seedData = seedData;
//# sourceMappingURL=seed-data.js.map