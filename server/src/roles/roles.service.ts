import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class RolesService {
  constructor(private db: DbService) {}

  createRole(dto: CreateRoleDto) {
    return this.db.role.create({ data: dto });
  }

  getRoleByValue(value: string) {
    return this.db.role.findFirst({ where: { value } });
  }
}
