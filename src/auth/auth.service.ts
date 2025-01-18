import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/auth-login-dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO.email);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException('Password does not match');
  }
}
