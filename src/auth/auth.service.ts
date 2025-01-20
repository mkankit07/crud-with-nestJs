import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { Enable2FAType, JwtPayload } from './types';
import { LoginDTO } from './dto/auth-login-dto';
import * as speakeasy from 'speakeasy';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }|{ validate2FA: string; message: string }> {
    const user = await this.userService.findOne(loginDTO.email); // 1.

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: JwtPayload = { email: user.email, userId: user.id };
      const artist = await this.artistService.findArtist(user.id); // 2
      if (artist) {
        payload.artistId = artist.id;
      }
      if (user.enable2FA && user.twoFASecret) {
        //1.
        // sends the validateToken request link
        // else otherwise sends the json web token in the response
        return {
          //2.
          validate2FA: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Please sends the one time password/token from your Google Authenticator App',
        };
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userService.disable2FA(user.id);
  }

  async validate2FA(
    userId: number,
    validateToken: ValidateTokenDTO,
  ): Promise<{ varified: boolean }> {
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
    } catch (err) {
      throw new UnauthorizedException('Error verifying token');
    }
  }

  async validateUserByApiKey(apiKey: string): Promise<User> {
    return this.userService.findByApiKey(apiKey);
  }
}
