import { Injectable } from '@nestjs/common';
import { IAltNameStrategyImpl } from './interfaces/alt-name.strategy.interface';
import { Model } from 'sequelize-typescript';
import { IAltName, ILocale } from './domain/alt-name.type';
import { Locale } from './domain/locale.entity';
import { ILocaleRepositoryImpl } from './interfaces/locale.repository.interface';
import { StrategyContext } from '../shared/utils/strategy-context.util';

@Injectable()
export class AltNameService<Create extends Model = Model> extends StrategyContext<
  IAltNameStrategyImpl<Create>
> {
  public constructor(private readonly localeRepository: ILocaleRepositoryImpl) {
    super();
  }

  public async getAll(): Promise<Locale[]> {
    return this.localeRepository.getAll();
  }

  public async createLocaleCollect(locales: ILocale[]) {
    return await Promise.all(locales.map((locale) => this.localeRepository.createLocale(locale)));
  }

  private async handleCreate(payload: IAltName, ownerId: string): Promise<Create> {
    this.checkExistStrategy(this.strategy);

    return await this.strategy!.create({
      id: payload.id,
      caption: payload.caption,
      description: payload.description,
      localeId: payload.locale.id,
      ownerId,
    });
  }

  private async handleUpdate(payload: IAltName, ownerId: string): Promise<[number, Create[]]> {
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

  public async createCollect(altNames: IAltName[], ownerId: string): Promise<Create[]> {
    return await Promise.all(
      altNames.map((altName) =>
        this.handleCreate(altName, ownerId).then((altName) => altName.dataValues),
      ),
    );
  }

  public async updateCollect(altNames: IAltName[], ownerId: string): Promise<void> {
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
