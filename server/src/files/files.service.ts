import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../entities/media.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {}

  async saveMedia(media: Array<Express.Multer.File>, category: Category): Promise<Media[]> {
    return await Promise.all(
      media.map(async (file) => {
        return await this.mediaRepository.save({ ...file, category });
      }),
    );
  }
}
