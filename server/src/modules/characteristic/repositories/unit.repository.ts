import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Unit } from '../domain/units.entity';
import { v4 as uuidv4 } from 'uuid';
import { IUnitRepositoryImpl } from '../interfaces/unit.repository.interface';

@Injectable()
export class UnitRepository implements IUnitRepositoryImpl {
  public constructor(@InjectModel(Unit) private unitsRepository: typeof Unit) {}

  public async getAll(): Promise<Unit[]> {
    return await this.unitsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }

  public async findOrCreate(caption: string | null): Promise<Unit> {
    return await this.unitsRepository
      .findOrCreate({
        where: { caption },
        defaults: {
          id: uuidv4(),
          caption,
        },
      })
      .then((unit) => unit[0]);
  }

  public async removeUnused(): Promise<number> {
    return await this.unitsRepository.destroy({
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
}
