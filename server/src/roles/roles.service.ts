import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  async createRole(dto: CreateRoleDto) {}

  async getRoleByValue(value: string) {}
}
