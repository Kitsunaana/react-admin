import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { Role } from '../entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('user');
    const user = this.usersRepository.save({ ...dto, roles: [role] });

    return user;
  }

  getAllUsers() {
    return this.usersRepository.findAndCount({ relations: { roles: true } });
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: { roles: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: dto.userId },
        relations: { roles: true },
      });

      if (user.roles.some((role) => role.id === dto.roleId)) return user;

      const role = await this.rolesRepository.findOneOrFail({ where: { id: dto.roleId } });

      return this.usersRepository.save({ ...user, roles: [...user.roles, role] });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException({ name: 'notFoundEntity' }, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
