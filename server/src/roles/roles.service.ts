import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  createRole(dto: CreateRoleDto) {
    return this.roleRepository.save(dto);
  }

  getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { name: value } });
  }
}
