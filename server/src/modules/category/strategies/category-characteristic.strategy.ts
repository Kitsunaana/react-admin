import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CategoryCharacteristic } from '../domain/category-characteristic.entity';
import {
  CharacteristicStrategyImpl,
  CharacteristicUpdatePayload,
  CharacteristicCreatePayload,
} from '../../characteristic/interfaces/characteristic.strategy.interface';

@Injectable()
export class CategoryCharacteristicStrategy
  implements CharacteristicStrategyImpl<CategoryCharacteristic>
{
  constructor(
    @InjectModel(CategoryCharacteristic)
    private categoryCharacteristicModel: typeof CategoryCharacteristic,
  ) {}

  public async create(data: CharacteristicCreatePayload): Promise<CategoryCharacteristic> {
    return await this.categoryCharacteristicModel.create(
      {
        id: uuidv4(),
        unitId: data.unitId,
        categoryId: data.ownerId,
        characteristicId: data.characteristicId,
        hideClient: data.hideClient,
        value: data.value,
      },
      {
        returning: true,
      },
    );
  }

  public async update(payload: CharacteristicUpdatePayload): Promise<CategoryCharacteristic[]> {
    return await this.categoryCharacteristicModel
      .update(
        {
          categoryId: payload.ownerId,
          hideClient: payload.hideClient,
          unitId: payload.unitId,
          value: payload.value,
          characteristicId: payload.characteristicId,
        },
        {
          returning: true,
          where: {
            id: payload.id,
          },
        },
      )
      .then((response) => response[1]);
  }

  public async removeById(id: string): Promise<number> {
    return await this.categoryCharacteristicModel.destroy({
      where: {
        id,
      },
    });
  }

  public async removeByOwnerId(ownerId: string): Promise<number> {
    return await this.categoryCharacteristicModel.destroy({
      where: {
        categoryId: ownerId,
      },
    });
  }
}
