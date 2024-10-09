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
  ) { }

  async createCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    const [unit] = await this.unitRepository.findOrCreate(payload.unit);
    const [characteristic] = await this.characteristicRepository.findOrCreate(payload.caption);

    await this.categoryCharacteristicsRepository.create({
      characteristicId: characteristic.id,
      categoryId: categoryId,
      unitId: unit.id,
      value: payload.value,
      hideClient: payload.hideClient,
    });
  }

  async updateCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    const [unit] = await this.unitRepository.findOrCreate(payload.unit);
    const [characteristic] = await this.characteristicRepository.findOrCreate(payload.caption);

    await this.categoryCharacteristicsRepository.update(
      {
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
        await actions[item.action]?.bind(this)(item, categoryId);
      }),
    );

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  async remove(categoryId: number) {
    await this.categoryCharacteristicsRepository.destroy({ where: { categoryId } });
  }
}
