import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Characteristic } from '../../entities/characteristic.entity';

@Injectable()
export class CharacteristicRepository {
  constructor(
    @InjectModel(Characteristic) private characteristicsRepository: typeof Characteristic,
  ) {}

  async findOrCreate(caption: string) {
    return await this.characteristicsRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async removeUnused() {
    await this.characteristicsRepository.destroy({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`(
            SELECT "characteristicId" FROM "CategoryCharacteristics"
            GROUP BY "characteristicId"
          )`),
        },
      },
    });
  }

  async getAll() {
    return await this.characteristicsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }
}
