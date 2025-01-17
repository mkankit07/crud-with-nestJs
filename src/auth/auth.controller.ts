import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatUserDTO } from '../user/dto/create-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private userService:UserService) {}

    @Post("signup")
    setUp(@Body() userDTO:CreatUserDTO) {

    }
}
