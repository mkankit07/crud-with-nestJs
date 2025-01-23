import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'provide the token of the user',
  })
  token: string;
}
