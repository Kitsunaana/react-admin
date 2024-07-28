import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from '../db/db.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('user');
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

    return user;
  }

  getAllUsers() {
    return this.db.user.findMany({
      include: { roles: { include: { Role: true } } },
    });
  }

  getUserByEmail(email: string) {
    return this.db.user.findFirst({
      where: { email },
      include: { roles: { include: { Role: true } } },
    });
  }
}
