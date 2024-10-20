import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from '../entities/media.entity';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([Media])],
})
export class FilesModule {}
