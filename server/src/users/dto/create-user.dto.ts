import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'kit@gmail.com', minLength: 6 })
  @IsString({ message: 'mustBeString' })
  @IsEmail({}, { message: 'mustBeEmail' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'mustBeString' })
  @Length(4, 16, { message: 'notCorrect' })
  readonly password: string;
}
