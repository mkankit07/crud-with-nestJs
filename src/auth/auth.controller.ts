import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatUserDTO } from '../user/dto/create-user-dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth-login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  setUp(@Body() userDTO: CreatUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(@Body() userDTO: LoginDTO): Promise<User> {
    return this.authService.login(userDTO);
  }
}
