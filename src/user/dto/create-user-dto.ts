import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jane',
    description: 'provide the firstName of the user',
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
    description: 'provide the lastName of the user',
  })
  readonly lastName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'provide the email of the user',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'provide the password of the user',
  })
  readonly password: string;
}
