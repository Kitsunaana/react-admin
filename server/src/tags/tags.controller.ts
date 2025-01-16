import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from 'src/tags/domain/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService<Tag>) { }

  @Get()
  async getAll(): Promise<string[]> {
    return this.tagsService.getAll();
  }
}
