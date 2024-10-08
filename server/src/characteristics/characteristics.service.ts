import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryCharacteristic } from '../entities/characteristic.entity';
import { Common } from '../shared/types/common';
import { UnitRepository } from './repository/unit';
import { CharacteristicRepository } from './repository/characteristic';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicsRepository: typeof CategoryCharacteristic,
    private unitRepository: UnitRepository,
    private characteristicRepository: CharacteristicRepository,
  ) {}

  async createCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    const [unit] = await this.unitRepository.findOrCreate(payload.unit);
    const [characteristic] = await this.characteristicRepository.findOrCreate(payload.caption);

    return await this.categoryCharacteristicsRepository.create({
      characteristicId: characteristic.id,
      categoryId: categoryId,
      unitId: unit.id,
      value: payload.value,
      hideClient: payload.hideClient,
    });
  }

  async updateCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    console.log(payload);
    const [unit] = await this.unitRepository.findOrCreate(payload.unit);
    const [characteristic] = await this.characteristicRepository.findOrCreate(payload.caption);

    return await this.categoryCharacteristicsRepository.update(
      {
        id: payload.id as number,
        value: payload.value,
        hideClient: payload.hideClient,
        characteristicId: characteristic.id,
        unitId: unit.id,
        categoryId: categoryId,
      },
      {
        where: { id: payload.id },
        returning: false,
      },
    );

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  async removeCharacteristic(data: Common.CharacteristicCreate) {
    await this.categoryCharacteristicsRepository.destroy({ where: { id: data.id } });

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  async create(items: Common.CharacteristicCreate[], categoryId: number) {
    await Promise.all(items.map(async (item) => this.createCharacteristic(item, categoryId)));
  }

  async update(items: Common.CharacteristicCreate[], categoryId: number) {
    const actions = {
      create: this.createCharacteristic,
      update: this.updateCharacteristic,
      remove: this.removeCharacteristic,
    };

    await Promise.all(
      items.map(async (item) => {
        // if (item.action === 'create') return await this.createCharacteristic(item, categoryId);
        // if (item.action === 'update') return await this.updateCharacteristic(item, categoryId);
        // if (item.action === 'remove') return await this.removeCharacteristic(item);

        return await actions[item.action]?.bind(this)(item, categoryId);
      }),
    );
  }

  async remove(categoryId: number) {
    await this.categoryCharacteristicsRepository.destroy({ where: { categoryId } });

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }
}
