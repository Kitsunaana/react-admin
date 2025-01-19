import { Injectable } from '@nestjs/common';
import { ITagStrategyImpl } from './interfaces/tag.strategy.interface';
import { Model } from 'sequelize-typescript';
import { ITag } from './domain/tag.type';
import { IPatchTagInput } from './inputs/patch-tag.input';
import { IPostTagInput } from './inputs/post-tag.input';
import { ITagRepositoryImpl } from './interfaces/tag.repository.interface';
import { StrategyContext } from '../shared/utils/strategy-context.util';

@Injectable()
export class TagsService<Create extends Model> extends StrategyContext<ITagStrategyImpl<Create>> {
  public constructor(private tagRepository: ITagRepositoryImpl) {
    super();
  }

  public async getAll(): Promise<string[]> {
    return await this.tagRepository.getAll().then((tags) => tags.map((tag) => tag.caption));
  }

  private async handleCreate(payload: IPostTagInput, ownerId: string): Promise<Create> {
    this.checkExistStrategy(this.strategy);

    const tag = await this.tagRepository.upsert(payload.caption);

    return await this.strategy!.create({
      ownerId,
      tagId: tag.id,
      icon: payload.icon,
      color: payload.color,
    });
  }

  private async handleUpdate(payload: IPatchTagInput, ownerId: string): Promise<Create[]> {
    this.checkExistStrategy(this.strategy);

    const tag = await this.tagRepository.upsert(payload.caption);

    return this.strategy!.update({
      ownerId,
      tagId: tag.id,
      id: payload.id,
      color: payload.color,
      icon: payload.icon,
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

  public async createCollect(tags: ITag[], ownerId: string): Promise<Create[]> {
    return Promise.all(tags.map((item) => this.handleCreate(item, ownerId)));
  }

  public async updateCollect(tags: ITag[], ownerId: string): Promise<void> {
    await Promise.all<Promise<Create> | Promise<Create[]> | Promise<number> | undefined>(
      tags.map((item) => {
        if (item.status === 'create') return this.handleCreate(item, ownerId);
        if (item.status === 'update') return this.handleUpdate(item, ownerId);
        if (item.status === 'remove') return this.handleRemoveById(item.id);
      }),
    );

    await this.tagRepository.removeUnused();
  }

  public async removeCollect(ownerId: string): Promise<void> {
    await this.handleRemoveByOwnerId(ownerId);

    await this.tagRepository.removeUnused();
  }
}
