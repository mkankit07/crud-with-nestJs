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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const artist_service_1 = require("../artist/artist.service");
const speakeasy = require("speakeasy");
let AuthService = class AuthService {
    constructor(userService, jwtService, artistService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.artistService = artistService;
    }
    async login(loginDTO) {
        const user = await this.userService.findOne(loginDTO.email);
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
        if (passwordMatched) {
            delete user.password;
            const payload = { email: user.email, userId: user.id };
            const artist = await this.artistService.findArtist(user.id);
            if (artist) {
                payload.artistId = artist.id;
            }
            if (user.enable2FA && user.twoFASecret) {
                return {
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message: 'Please sends the one time password/token from your Google Authenticator App',
                };
            }
            return {
                accessToken: this.jwtService.sign(payload),
            };
        }
        else {
            throw new common_1.UnauthorizedException('Password does not match');
        }
    }
    async enable2FA(userId) {
        const user = await this.userService.findById(userId);
        if (user.enable2FA) {
            return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret();
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return { secret: user.twoFASecret };
    }
    async disable2FA(userId) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.userService.disable2FA(user.id);
    }
    async validate2FA(userId, validateToken) {
        try {
            const user = await this.userService.findById(userId);
            const varified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                token: validateToken.token,
                encoding: 'base32',
            });
            if (varified) {
                return { varified: true };
            }
            return { varified: false };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Error verifying token');
        }
    }
    async validateUserByApiKey(apiKey) {
        return this.userService.findByApiKey(apiKey);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        artist_service_1.ArtistService])
], AuthService);
//# sourceMappingURL=auth.service.js.map