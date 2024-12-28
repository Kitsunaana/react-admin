import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Unit } from '../../entities/units.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UnitRepository {
  constructor(@InjectModel(Unit) private unitsRepository: typeof Unit) { }

  async findOrCreate(caption: string | null) {
    return await this.unitsRepository.findOrCreate({
      where: { caption },
      defaults: { caption, id: uuidv4() },
    });
  }

  async removeUnused() {
    await this.unitsRepository.destroy({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`(
            SELECT "unitId" FROM "CategoryCharacteristics"
            GROUP BY "unitId"
          )`),
        },
      },
    });
  }

  async getAll() {
    return await this.unitsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }
}
