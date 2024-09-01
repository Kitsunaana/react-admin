import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from '../entities/tag.entity';
import { CategoryTag } from '../entities/category-tag.entity';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
  imports: [SequelizeModule.forFeature([Tag, CategoryTag])],
})
export class TagsModule {}
