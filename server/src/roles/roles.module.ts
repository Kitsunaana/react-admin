import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [DbModule],
  exports: [RolesService],
})
export class RolesModule {}
