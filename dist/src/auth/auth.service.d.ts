import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { Enable2FAType } from './types';
import { LoginDTO } from './dto/auth-login-dto';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { UpdateResult } from 'typeorm';
export declare class AuthService {
    private userService;
    private jwtService;
    private artistService;
    constructor(userService: UserService, jwtService: JwtService, artistService: ArtistService);
    login(loginDTO: LoginDTO): Promise<{
        accessToken: string;
    } | {
        validate2FA: string;
        message: string;
    }>;
    enable2FA(userId: number): Promise<Enable2FAType>;
    disable2FA(userId: number): Promise<UpdateResult>;
    validate2FA(userId: number, validateToken: ValidateTokenDTO): Promise<{
        varified: boolean;
    }>;
    validateUserByApiKey(apiKey: string): Promise<User>;
}
