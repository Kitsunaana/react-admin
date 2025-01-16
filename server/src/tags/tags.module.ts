import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './domain/tag.entity';
import { TagRepository } from './repositories/tag.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  providers: [
    TagRepository,
    {
      inject: [TagRepository],
      provide: TagsService,
      useFactory: (tagRepository: TagRepository) => new TagsService(tagRepository),
    },
  ],
  controllers: [TagsController],
  exports: [TagsService, TagRepository],
  imports: [SequelizeModule.forFeature([Tag])],
})
export class TagsModule {}
