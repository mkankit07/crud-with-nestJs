import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatUserDTO } from '../user/dto/create-user-dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth-login-dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({summary:"Register new user",})
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  setUp(@Body() userDTO: CreatUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(@Body() userDTO: LoginDTO): Promise<{ accessToken: string }| { validate2FA: string; message: string }> {
    return this.authService.login(userDTO);
  }

  @Get("enable-2fa")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  enable2FA(@Req() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.id);
  }

  @Get("disable-2fa")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  disable2FA(@Req() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.id);
  }

  @Post("validate-2fa")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Body()
    validateToken:ValidateTokenDTO ,
    @Req() req
  ): Promise<{varified:boolean}> {
    return this.authService.validate2FA(req.user.id, validateToken);
  }

  @Get('profile')
  @ApiBearerAuth("JWT-auth")
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Req()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }
}
