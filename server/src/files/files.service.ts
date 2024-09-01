import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from '../entities/media.entity';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  async saveMedia(
    media: Array<Express.Multer.File>,
    imagesIds: Array<{ id: string; caption: string }>,
    categoryId: number,
  ) {
    return await Promise.all(
      media.map(async (file) => {
        const image = imagesIds.find((image) => image.caption === file.originalname);

        return await this.mediaRepository.create({
          id: image.id,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          path: file.path,
          categoryId: categoryId,
          originalName: file.originalname,
        });
      }),
    );
  }

  async deleteMedia(media?: Media[]): Promise<void[]> {
    return await Promise.all(
      media?.map(async (file) => {
        if (fs.existsSync(file.path)) {
          await this.mediaRepository.destroy({ where: { id: file.id } });

          return fs.unlink(file.path, (err) => {
            console.log(err);
          });
        }
      }),
    );
  }

  async updateOrder(media: Media[]) {
    return await Promise.all(
      media.map(async (file) => {
        return await this.mediaRepository.update(file, { where: { id: file.id } });
      }),
    );
  }
}
