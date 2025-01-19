import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Characteristic } from '../domain/characteristic.entity';
import { v4 as uuidv4 } from 'uuid';
import { ICharacteristicRepositoryImpl } from '../interfaces/characteristic.repository.interface';

@Injectable()
export class CharacteristicRepository implements ICharacteristicRepositoryImpl {
  public constructor(
    @InjectModel(Characteristic) private characteristicsRepository: typeof Characteristic,
  ) { }

  public async getAll(): Promise<Characteristic[]> {
    return await this.characteristicsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }

  public async findOrCreate(caption: string): Promise<Characteristic> {
    return await this.characteristicsRepository
      .findOrCreate({
        where: {
          caption,
        },
        defaults: {
          id: uuidv4(),
          caption,
        },
      })
      .then((characteristic) => characteristic[0]);
  }

  public async removeById(id: string): Promise<number> {
    return await this.characteristicsRepository.destroy({
      where: {
        id,
      },
    });
  }

  public async removeUnused(): Promise<number> {
    return await this.characteristicsRepository.destroy({
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
}
