import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../entities/role.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Role]), RolesModule, AuthModule],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
