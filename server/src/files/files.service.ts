import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';
import { Media } from '../entities-sequelize/media.entity';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  async saveMedia(media: Array<Express.Multer.File>, category: Category) {
    return await Promise.all(
      media.map(async (file) => {
        // return await this.mediaRepository.create({ ...file });
        return await this.mediaRepository.create({
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          path: file.path,
          categoryId: category.id,
        });
      }),
    );
  }
}
