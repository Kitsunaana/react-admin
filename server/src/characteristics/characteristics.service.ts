import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryCharacteristic } from '../entities/characteristic.entity';
import { Characteristic } from '../shared/types/types';
import { CharacteristicRepository } from './repository/characteristic';
import { UnitRepository } from './repository/unit';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicsRepository: typeof CategoryCharacteristic,
    private unitRepository: UnitRepository,
    private characteristicRepository: CharacteristicRepository,
  ) { }

  async createCharacteristic(payload: Characteristic, categoryId: string) {
    const [unit] = await this.unitRepository.findOrCreate(payload.unit);
    const [characteristic] = await this.characteristicRepository.findOrCreate(payload.caption);

    await this.categoryCharacteristicsRepository.create({
      id: uuidv4(),
      characteristicId: characteristic.id,
      categoryId,
      unitId: unit.id,
      value: payload.value,
      hideClient: payload.hideClient,
    });
  }

  async updateCharacteristic(payload: Characteristic, categoryId: string) {
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

  async removeCharacteristic(data: Characteristic) {
    await this.categoryCharacteristicsRepository.destroy({ where: { id: data.id } });

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  async create(items: Characteristic[], categoryId: string) {
    await Promise.all(items.map(async (item) => this.createCharacteristic(item, categoryId)));
  }

  async update(items: Characteristic[], categoryId: string) {
    const actions = {
      create: this.createCharacteristic,
      update: this.updateCharacteristic,
      remove: this.removeCharacteristic,
    };

    await Promise.all(
      items.map(async (item) => {
        await actions[item.status]?.bind(this)(item, categoryId);
      }),
    );

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  async remove(categoryId: string) {
    await this.categoryCharacteristicsRepository.destroy({ where: { categoryId } });
  }
}
