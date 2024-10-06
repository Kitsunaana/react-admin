import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CategoryCharacteristic,
  CategoryCharacteristicCreate,
  CategoryCharacteristicUpdate,
  Characteristic,
} from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import { Category } from '../entities/category.entity';
import { CreateCharacteristicsDto } from './dto/create-characteristics-dto';
import { UpdatedCharacteristicsDto } from './dto/update-characteristics-dto';
import { Op } from 'sequelize';
import { Common } from '../shared/types/common';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Characteristic) private characteristicsRepository: typeof Characteristic,
    @InjectModel(Unit) private unitsRepository: typeof Unit,
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicsRepository: typeof CategoryCharacteristic,
  ) {}

  async findOrCreateUnit(unit: string | null) {
    return await this.unitsRepository.findOrCreate({
      where: { caption: unit },
      defaults: { caption: unit },
    });
  }

  async findOrCreateCharacteristic(caption: string) {
    return await this.characteristicsRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async findOrCreateCategoryCharacteristic(data: CategoryCharacteristicCreate) {
    return await this.categoryCharacteristicsRepository.findOrCreate({
      defaults: data,
      where: {
        characteristicId: data.characteristicId,
        categoryId: data.categoryId,
      },
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

    const categoryCharacteristic = await this.findOrCreateCategoryCharacteristic({
      characteristicId: characteristic.id,
      categoryId: categoryId,
      unitId: unit.id,
      value: payload.value,
      hideClient: payload.hideClient,
    });

    return categoryCharacteristic;
  }

  async updateCharacteristic(payload: Common.CharacteristicCreate, categoryId: number) {
    // const { unit } = payload

    const [unit] = await this.findOrCreateUnit(data.unit);
    const [characteristic] = await this.findOrCreateCharacteristic(data.caption);

    await this.updateCategoryCharacteristic({
      id: data.id,
      value: data.value,
      hideClient: data.hideClient,
      characteristicId: characteristic.id,
      unitId: unit.id,
      categoryId: categoryId,
    });

    const rows = await this.characteristicsRepository.findAll({
      include: [{ model: Category }],
    });

    await Promise.all(
      rows.map(async (row) => {
        if (row.categories.length === 0) {
          await this.characteristicsRepository.destroy({ where: { id: row.id } });
        }
      }),
    );

    const usedUnitIds = await this.categoryCharacteristicsRepository
      .findAll({
        include: [{ model: Unit }],
      })
      .then((data) => data.map((item) => item.unitId));

    const freeUnits = await this.unitsRepository.findAll({
      where: { id: { [Op.notIn]: usedUnitIds } },
    });

    await Promise.all(freeUnits.map(async (unit) => unit.destroy()));
  }

  async destroyUnit(unit: string | null) {
    const units = await this.categoryCharacteristicsRepository.findAll({
      include: [{ model: Unit, where: { caption: unit } }],
    });

    if (units.length === 0) {
      return await this.unitsRepository.destroy({ where: { caption: unit } });
    }

    return units;
  }

  async destroyCharacteristic(caption: string) {
    const characteristics = await this.categoryCharacteristicsRepository.findAll({
      include: [{ model: Characteristic, where: { caption } }],
    });

    if (characteristics.length === 0) {
      return await this.characteristicsRepository.destroy({ where: { caption: caption } });
    }

    return characteristics;
  }

  async removeCharacteristic(data: UpdatedCharacteristicsDto) {
    await this.categoryCharacteristicsRepository.destroy({ where: { id: data.id } });
    await this.destroyUnit(data.unit);
    await this.destroyCharacteristic(data.caption);
  }

  async create(items: Common.CharacteristicCreate[], category: Category) {
    await Promise.all(items.map(async (item) => this.createCharacteristic(item, category.id)));
  }

  async update(items: Common.CharacteristicCreate[], categoryId: number) {
    await Promise.all(
      items.map(async (item) => {
        if (item.action === 'update') return await this.updateCharacteristic(item, categoryId);
        if (item.action === 'create') return await this.createCharacteristic(item, categoryId);
        if (item.action === 'remove') return await this.removeCharacteristic(item);
      }),
    );
  }

  async delete(categoryId: number) {
    const categoryCharacteristics = await this.categoryCharacteristicsRepository.findAll({
      where: { categoryId },
    });

    await this.categoryCharacteristicsRepository.destroy({ where: { categoryId } });

    await Promise.all(
      categoryCharacteristics.map(async (categoryCharacteristic) => {
        const characteristics = await this.categoryCharacteristicsRepository.findAll({
          include: [
            { model: Characteristic, where: { id: categoryCharacteristic.characteristicId } },
          ],
        });

        const units = await this.categoryCharacteristicsRepository.findAll({
          include: [{ model: Unit, where: { id: categoryCharacteristic.unitId } }],
        });

        if (characteristics.length === 0) {
          await this.characteristicsRepository.destroy({
            where: { id: categoryCharacteristic.characteristicId },
          });
        }

        if (units.length === 0) {
          await this.unitsRepository.destroy({ where: { id: categoryCharacteristic.unitId } });
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
