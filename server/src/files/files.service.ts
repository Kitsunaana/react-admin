import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from '../entities/media.entity';
import { Common } from '../shared/types/common';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  async create(media: Common.Media[], categoryId: number) {
    await Promise.all(
      media.map(async (item) => {
        return await this.mediaRepository.findOrCreate({
          where: { id: item.id, categoryId },
          defaults: {
            filename: item.filename,
            originalName: item.originalName,
            size: item.size,
            mimetype: item.mimetype,
            path: item.path,
            order: item.order,
            id: item.id,
            categoryId,
          },
        });
      }),
    );
  }

  async delete(media: Common.Media[]): Promise<void[]> {
    return await Promise.all(
      media?.map(async ({ id }) => {
        await this.mediaRepository.destroy({ where: { id } });
      }),
    );
  }

  async updateOrder(media: Common.Media[]) {
    return await Promise.all(
      media.map(async (file) => {
        return await this.mediaRepository.update(file, {
          where: { id: file.id },
          returning: false,
        });
      }),
    );
  }

  async update(media: Common.Media[]) {
    return await Promise.all(
      media.map(async (item) => {
        return await this.mediaRepository.update(
          {
            id: item.id,
            filename: item.filename,
            originalName: item.originalName,
            size: item.size,
            mimetype: item.mimetype,
            path: item.path,
            order: item.order,
          },
          { where: { id: item.id }, returning: false },
        );
      }),
    );
  }
}
