import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from '../entities/media.entity';
import * as fs from 'fs';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  async saveUploadedMedia(media: Media[], categoryId: number) {
    await Promise.all(
      media.map(async ({ id, ...otherProperties }) => {
        return await this.mediaRepository.findOrCreate({
          where: { id, categoryId },
          defaults: {
            ...otherProperties,
            categoryId,
            id: v4(),
          },
        });
      }),
    );
  }

  async saveMedia(
    media: Array<Express.Multer.File>,
    imagesIds: Array<{ id: string; caption: string }>,
    owner: {
      categoryId?: number;
      goodId?: number;
    },
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
          categoryId: owner.categoryId,
          originalName: file.originalname,
        });
      }),
    );
  }

  async deleteMedia(media?: Media[]): Promise<void[]> {
    return await Promise.all(
      media?.map(async ({ path, id }) => {
        await this.mediaRepository.destroy({ where: { id } });

        const allMedia = await this.mediaRepository.findAll({
          where: { path },
        });

        if (allMedia.length === 0 && fs.existsSync(path)) {
          return fs.unlink(path, console.log);
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

/*
[{
  "id": "naEoW2lv9IbEqIzmw2Cyy",
  "originalName": "Screenshot_6.png",
  "path": "uploads\\1725781173657-716857790Screenshot_6.png",
  "order": null,
  "filename": "1725781173657-716857790Screenshot_6.png",
  "mimetype": "image/png",
  "size": 778240,
  "deleted": true
}]*/
