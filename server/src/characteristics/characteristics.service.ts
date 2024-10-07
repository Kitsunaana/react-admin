import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CategoryCharacteristic,
  CategoryCharacteristicUpdate,
  Characteristic,
} from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import sequelize, { Op } from 'sequelize';
import { Common } from '../shared/types/common';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Characteristic) private characteristicsRepository: typeof Characteristic,
    @InjectModel(Unit) private unitsRepository: typeof Unit,
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicsRepository: typeof CategoryCharacteristic,
  ) {}

  async findOrCreateUnit(caption: string | null) {
    return await this.unitsRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async findOrCreateCharacteristic(caption: string) {
    return await this.characteristicsRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async updateCategoryCharacteristic(data: CategoryCharacteristicUpdate) {
    return await this.categoryCharacteristicsRepository.update(data, {
      where: { id: data.id },
      returning: false,
    });
  }

  async createCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    const [unit] = await this.findOrCreateUnit(payload.unit);
    const [characteristic] = await this.findOrCreateCharacteristic(payload.caption);

    return await this.categoryCharacteristicsRepository.create({
      characteristicId: characteristic.id,
      categoryId: categoryId,
      unitId: unit.id,
      value: payload.value,
      hideClient: payload.hideClient,
    });
  }

  async removeUnusedCharacteristics() {
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

  async removeUnusedUnits() {
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

  async updateCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    const [unit] = await this.findOrCreateUnit(payload.unit);
    const [characteristic] = await this.findOrCreateCharacteristic(payload.caption);

    await this.updateCategoryCharacteristic({
      id: payload.id as number,
      value: payload.value,
      hideClient: payload.hideClient,
      characteristicId: characteristic.id,
      unitId: unit.id,
      categoryId: categoryId,
    });

    await this.removeUnusedCharacteristics();
    await this.removeUnusedUnits();
  }

  async removeCharacteristic(data: Common.CharacteristicCreate) {
    await this.categoryCharacteristicsRepository.destroy({ where: { id: data.id } });

    await this.removeUnusedCharacteristics();
    await this.removeUnusedUnits();
  }

  async create(items: Common.CharacteristicCreate[], categoryId: number) {
    await Promise.all(items.map(async (item) => this.createCharacteristic(item, categoryId)));
  }

  async update(items: Common.CharacteristicCreate[], categoryId: number) {
    await Promise.all(
      items.map(async (item) => {
        if (item.action === 'create') return await this.createCharacteristic(item, categoryId);
        if (item.action === 'update') return await this.updateCharacteristic(item, categoryId);
        if (item.action === 'remove') return await this.removeCharacteristic(item);
      }),
    );
  }

  async remove(categoryId: number) {
    await this.categoryCharacteristicsRepository.destroy({ where: { categoryId } });

    await this.removeUnusedCharacteristics();
    await this.removeUnusedUnits();
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
