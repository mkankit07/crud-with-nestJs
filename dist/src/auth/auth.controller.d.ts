import { UserService } from 'src/user/user.service';
import { CreatUserDTO } from '../user/dto/create-user-dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth-login-dto';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { UpdateResult } from 'typeorm';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    setUp(userDTO: CreatUserDTO): Promise<User>;
    login(userDTO: LoginDTO): Promise<{
        accessToken: string;
    } | {
        validate2FA: string;
        message: string;
    }>;
    enable2FA(req: any): Promise<Enable2FAType>;
    disable2FA(req: any): Promise<UpdateResult>;
    validate2FA(validateToken: ValidateTokenDTO, req: any): Promise<{
        varified: boolean;
    }>;
    getProfile(req: any): {
        msg: string;
        user: any;
    };
}
