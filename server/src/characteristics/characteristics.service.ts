import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { ICharacteristic } from './domain/characteristic.type';
import { CharacteristicStrategyImpl } from './interfaces/characteristic.strategy.interface';
import { IUnitRepositoryImpl } from './interfaces/unit.repository.interface';
import { ICharacteristicRepositoryImpl } from './interfaces/characteristic.repository.interface';
import { StrategyContext } from '../shared/utils/strategy-context.util';

@Injectable()
export class CharacteristicsService<Create extends Model> extends StrategyContext<
  CharacteristicStrategyImpl<Create>
> {
  public constructor(
    private characteristicRepository: ICharacteristicRepositoryImpl,
    private unitRepository: IUnitRepositoryImpl,
  ) {
    super();
  }

  private async handleCreate(payload: ICharacteristic, ownerId: string): Promise<Create> {
    this.checkExistStrategy(this.strategy);

    const unit = await this.unitRepository.findOrCreate(payload.unit);
    const characteristic = await this.characteristicRepository.findOrCreate(payload.caption);

    return await this.strategy!.create({
      ownerId,
      unitId: unit.id,
      characteristicId: characteristic.id,
      hideClient: payload.hideClient,
      value: payload.value,
    }).then((characteristic) => characteristic.get({ plain: true }));
  }

  private async handleUpdate(
    payload: ICharacteristic,
    ownerId: string,
  ): Promise<[number, Create[]]> {
    this.checkExistStrategy(this.strategy);

    const unit = await this.unitRepository.findOrCreate(payload.unit);
    const characteristic = await this.characteristicRepository.findOrCreate(payload.caption);

    return await this.strategy!.update({
      ownerId,
      id: payload.id,
      unitId: unit.id,
      characteristicId: characteristic.id,
      hideClient: payload.hideClient,
      value: payload.value,
    });
  }

  private async handleRemoveById(data: ICharacteristic): Promise<number> {
    this.checkExistStrategy(this.strategy);

    await this.characteristicRepository.removeById(data.id);
    return await this.strategy!.removeById(data.id);
  }

  private async handleRemoveByOwnerId(ownerId: string): Promise<number> {
    this.checkExistStrategy(this.strategy);

    return this.strategy!.removeByOwnerId(ownerId);
  }

  public async createCollect(items: ICharacteristic[], ownerId: string): Promise<Create[]> {
    return await Promise.all(items.map((item) => this.handleCreate(item, ownerId)));
  }

  public async updateCollect(items: ICharacteristic[], categoryId: string): Promise<void> {
    await Promise.all<Promise<Create> | Promise<[number, Create[]]> | Promise<number> | undefined>(
      items.map((item) => {
        if (item.status === 'create') return this.handleCreate(item, categoryId);
        if (item.status === 'update') return this.handleUpdate(item, categoryId);
        if (item.status === 'remove') return this.handleRemoveById(item);
      }),
    );

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }

  public async removeCollect(ownerId: string): Promise<void> {
    await this.handleRemoveByOwnerId(ownerId);

    await this.characteristicRepository.removeUnused();
    await this.unitRepository.removeUnused();
  }
}
