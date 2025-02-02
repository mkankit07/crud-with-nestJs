import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'jane_doe@gmail.com',
        description: 'provide the email of the user',
      })
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'provide the password of the user',
      })
    readonly password:string
}