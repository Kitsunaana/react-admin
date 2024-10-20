import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryTag } from '../entities/category-tag.entity';
import { Tag } from '../entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
  imports: [SequelizeModule.forFeature([Tag, CategoryTag])],
})
export class TagsModule {}
