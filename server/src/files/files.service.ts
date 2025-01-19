import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media as MediaEntity } from '../entities/media.entity';
import { Media } from '../shared/types/types';

@Injectable()
export class FilesService {
  constructor(@InjectModel(MediaEntity) private mediaRepository: typeof MediaEntity) {}

  async create(media: Media[], categoryId: string) {
    await Promise.all(
      media.map(async (item) => {
        return await this.mediaRepository.findOrCreate({
          where: { id: item.id, categoryId },
          defaults: {
            caption: item.caption,
            originalName: item.originalName,
            size: item.size,
            mimetype: item.mimetype,
            path: item.path,
            order: item.order,
            id: item.id,
            categoryId,
          },
          returning: false,
        });
      }),
    );
  }

  async delete(media: Media[]): Promise<void[]> {
    return await Promise.all(
      media?.map(async ({ id }) => {
        await this.mediaRepository.destroy({ where: { id } });
      }),
    );
  }

  async updateOrder(media: Media[]) {
    return await Promise.all(
      media.map(async (file) => {
        return await this.mediaRepository.update(file, {
          where: { id: file.id },
          returning: false,
        });
      }),
    );
  }

  async update(media: Media[]) {
    return await Promise.all(
      media.map(async (item) => {
        return await this.mediaRepository.update(
          {
            id: item.id,
            caption: item.caption,
            originalName: item.originalName,
            size: item.size,
            mimetype: item.mimetype,
            path: item.path,
            order: item.order,
          },
          {
            returning: false,
            where: {
              id: item.id,
            },
          },
        );
      }),
    );
  }
}
