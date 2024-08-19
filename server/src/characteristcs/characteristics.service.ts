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
          defaults: item,
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
}
