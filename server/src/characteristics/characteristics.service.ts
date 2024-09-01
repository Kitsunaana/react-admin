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
    });
  }

  async createCharacteristic(data: CreateCharacteristicsDto, categoryId: number) {
    const [unit] = await this.findOrCreateUnit(data.unit);
    const [characteristic] = await this.findOrCreateCharacteristic(data.caption);

    return await this.findOrCreateCategoryCharacteristic({
      characteristicId: characteristic.id,
      categoryId: categoryId,
      unitId: unit.id,
      value: data.value,
      hideClient: data.hideClient,
    });
  }

  async updateCharacteristic(data: UpdatedCharacteristicsDto, categoryId: number) {
    const [unit] = await this.findOrCreateUnit(data.unit);
    const [characteristic] = await this.findOrCreateCharacteristic(data.caption);

    return await this.updateCategoryCharacteristic({
      id: data.id,
      value: data.value,
      hideClient: data.hideClient,
      characteristicId: characteristic.id,
      unitId: unit.id,
      categoryId: categoryId,
    });
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

  async create(items: CreateCharacteristicsDto[], category: Category) {
    await Promise.all(items.map(async (item) => this.createCharacteristic(item, category.id)));
  }

  async update(items: UpdatedCharacteristicsDto[], categoryId: number) {
    await Promise.all(
      items.map(async (item) => {
        if (item.action === 'update') return await this.updateCharacteristic(item, categoryId);
        if (item.action === 'create') return await this.createCharacteristic(item, categoryId);
        if (item.action === 'remove') return await this.removeCharacteristic(item);
      }),
    );
  }

  async delete(categoryId: number) {
    await this.categoryCharacteristicsRepository.destroy({
      where: { categoryId },
    });
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
