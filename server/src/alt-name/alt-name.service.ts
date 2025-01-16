import { Injectable } from '@nestjs/common';
import { AltNameStrategyImpl } from './interfaces/alt-name.strategy.interface';
import { Model } from 'sequelize-typescript';
import { LocaleRepository } from './repositories/locale.repository';
import { StrategyException } from '../shared/exceptions/strategy.exception';
import { AltName } from './domain/types';
import { Locale } from './domain/locale.entity';

@Injectable()
export class AltNameService<Create extends Model = Model> {
  private strategy: AltNameStrategyImpl<Create> | undefined;

  public constructor(private readonly localeRepository: LocaleRepository) {}

  public setStrategy(strategy: AltNameStrategyImpl<Create>) {
    this.strategy = strategy;
  }

  private checkExistStrategy(
    strategy: AltNameStrategyImpl<Create> | undefined,
  ): strategy is AltNameStrategyImpl<Create> {
    if (strategy === undefined) throw new StrategyException('Alt name strategy is not defined');

    return true;
  }

  public async getAll(): Promise<Locale[]> {
    return this.localeRepository.getAll();
  }

  private async handleCreate(payload: AltName, ownerId: string): Promise<Create> {
    this.checkExistStrategy(this.strategy);

    return await this.strategy!.create({
      id: payload.id,
      caption: payload.caption,
      description: payload.description,
      localeId: payload.locale.id,
      ownerId,
    });
  }

  private async handleUpdate(payload: AltName, ownerId: string): Promise<[number, Create[]]> {
    this.checkExistStrategy(this.strategy);

    return await this.strategy!.update({
      id: payload.id,
      caption: payload.caption,
      description: payload.description,
      localeId: payload.locale.id,
      ownerId,
    });
  }

  private async handleRemoveById(id: string): Promise<number> {
    this.checkExistStrategy(this.strategy);

    return await this.strategy!.removeById(id);
  }

  private async handleRemoveByOwnerId(ownerId: string): Promise<number> {
    this.checkExistStrategy(this.strategy);

    return await this.strategy!.removeByOwnerId(ownerId);
  }

  public async createCollect(altNames: AltName[], ownerId: string): Promise<Create[]> {
    return await Promise.all(
      altNames.map((altName) =>
        this.handleCreate(altName, ownerId).then((altName) => altName.dataValues),
      ),
    );
  }

  public async updateCollect(altNames: AltName[], ownerId: string): Promise<void> {
    await Promise.all<Promise<Create> | Promise<[number, Create[]]> | Promise<number> | undefined>(
      altNames.map((altName) => {
        if (altName.status === 'create') return this.handleCreate(altName, ownerId);
        if (altName.status === 'update') return this.handleUpdate(altName, ownerId);
        if (altName.status === 'remove') return this.handleRemoveById(altName.id);
      }),
    );
  }

  public async removeCollect(ownerId: string): Promise<number> {
    return this.handleRemoveByOwnerId(ownerId);
  }
}
