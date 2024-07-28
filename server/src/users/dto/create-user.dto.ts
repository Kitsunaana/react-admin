import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'kit@gmail.com', minLength: 6 })
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
