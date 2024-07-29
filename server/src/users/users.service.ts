import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor() {}

  async createUser(dto: CreateUserDto) {
    /* const role = await this.roleService.getRoleByValue('admin');
    const user = await this.db.user.create({
      data: {
        ...dto,
        roles: {
          create: {
            roleId: role.id,
          },
        },
      },
      include: {
        roles: {
          select: {
            Role: true,
          },
        },
      },
    });

    return user;*/
  }

  getAllUsers() {
    /*return this.db.user.findMany({
      include: { roles: { include: { Role: true } } },
    });*/
  }

  getUserByEmail(email: string) {
    /*return this.db.user.findFirst({
      where: { email },
      include: { roles: { include: { Role: true } } },
    });*/
  }

  async addRole(dto: AddRoleDto) {
    /*return this.db.user.update({
      where: { id: dto.userId },
      data: {
        roles: {
          create: {
            roleId: dto.roleId,
          },
        },
      },
    });*/
  }
}
