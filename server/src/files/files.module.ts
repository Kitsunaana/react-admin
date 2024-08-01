import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from '../entities/media.entity';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [TypeOrmModule.forFeature([Media])],
})
export class FilesModule {}
