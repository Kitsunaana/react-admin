import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from '../entities-sequelize/media.entity';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([Media])],
})
export class FilesModule {}
