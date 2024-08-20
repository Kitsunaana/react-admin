import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CategoryCharacteristic,
  Characteristic,
} from '../entities-sequelize/characteristic.entity';
import { Unit } from '../entities-sequelize/units.entity';
import { Category } from '../entities-sequelize/category.entity';

export class CreateCharacteristicsDto {
  readonly caption: string;
  readonly units: string | null;
  readonly value: string;
  readonly hideClient: boolean;
}

export class UpdatedCharacteristicsDto extends CreateCharacteristicsDto {
  readonly action: 'update' | 'create';
  readonly id?: number;
  readonly deleted?: boolean;
}

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Characteristic) private characteristicsRepository: typeof Characteristic,
    @InjectModel(Unit) private unitsRepository: typeof Unit,
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicsRepository: typeof CategoryCharacteristic,
  ) {}

  async create(items: CreateCharacteristicsDto[], category: Category) {
    await Promise.all(
      items.map(async (item) => {
        const [unit] = await this.unitsRepository.findOrCreate({
          where: { caption: item.units },
          defaults: {
            caption: item.units,
          },
        });

        const [characteristic] = await this.characteristicsRepository.findOrCreate({
          where: { caption: item.caption },
          defaults: item.caption,
        });

        const categoryCharacteristics = {
          characteristicId: characteristic.id,
          categoryId: category.id,
          unitId: unit.id,
          value: item.value,
          hideClient: item.hideClient,
        };
        await this.categoryCharacteristicsRepository.findOrCreate({
          where: {
            characteristicId: characteristic.id,
            categoryId: category.id,
          },
          defaults: categoryCharacteristics,
        });
      }),
    );
  }

  async update(items: UpdatedCharacteristicsDto[], categoryId: number) {
    await Promise.all(
      items.map(async (item) => {
        if (item.action === 'update' && item?.id) {
          const [unit] = await this.unitsRepository.findOrCreate({
            where: { caption: item.units },
            defaults: { caption: item.units },
          });

          const [characteristic] = await this.characteristicsRepository.findOrCreate({
            where: { caption: item.caption },
            defaults: {
              caption: item.caption,
            },
          });

          await this.categoryCharacteristicsRepository.update(
            {
              value: item.value,
              hideClient: item.hideClient,
              characteristicId: characteristic.id,
              unitId: unit.id,
            },
            {
              where: { id: item.id },
            },
          );
        }

        if (item?.action === 'create') {
          const [unit] = await this.unitsRepository.findOrCreate({
            where: { caption: item.units },
            defaults: {
              caption: item.units,
            },
          });

          const [characteristic] = await this.characteristicsRepository.findOrCreate({
            where: { caption: item.caption },
            defaults: item.caption,
          });

          const categoryCharacteristics = {
            characteristicId: characteristic.id,
            categoryId: categoryId,
            unitId: unit.id,
            value: item.value,
            hideClient: item.hideClient,
          };
          await this.categoryCharacteristicsRepository.findOrCreate({
            where: {
              characteristicId: characteristic.id,
              categoryId: categoryId,
            },
            defaults: categoryCharacteristics,
          });
        }

        if (item?.deleted) {
          await this.categoryCharacteristicsRepository.destroy({ where: { id: item.id } });

          const units = await this.categoryCharacteristicsRepository.findAll({
            include: [{ model: Unit, where: { caption: item.units } }],
          });

          if (units.length === 0) {
            await this.unitsRepository.destroy({ where: { caption: item.units } });
          }

          const characteristics = await this.categoryCharacteristicsRepository.findAll({
            include: [{ model: Characteristic, where: { caption: item.caption } }],
          });

          if (characteristics.length === 0) {
            await this.characteristicsRepository.destroy({ where: { caption: item.caption } });
          }
        }
      }),
    );
  }

  async getAllCharacteristics() {
    return await this.characteristicsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }

  async getAllUnits() {
    return await this.unitsRepository.findAll({
      order: [['caption', 'asc']],
    });
  }
}
