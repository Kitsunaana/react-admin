import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    /*const user = await this.validateUser(userDto);

    return this.generateToken(user);*/
  }

  async registration(userDto: CreateUserDto) {
    /*const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Не удалось зарегистрироваться',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return await this.generateToken(user);*/
  }

  private async generateToken(user) {
    /* return {
      token: this.jwtService.sign(user),
    };*/
  }

  private async validateUser(userDto: CreateUserDto) {
    /*const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) return user;

    throw new UnauthorizedException({
      message: 'Не корректный email или пароль',
    });*/
  }
}
