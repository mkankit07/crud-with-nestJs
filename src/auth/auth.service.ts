import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/auth-login-dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO.email);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      const payload = { email: user.email, sub: user.id };
      return { accessToken: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Password does not match');
  }
}
