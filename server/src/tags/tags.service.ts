import { Inject, Injectable } from '@nestjs/common';
import { Tag } from '../shared/types/types';
import { TagStrategy } from './strategies/interface';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagsService {
  private strategy: TagStrategy;

  constructor(
    @Inject('TagStrategies') private strategies: TagStrategy[],
    private tagRepository: TagRepository,
  ) { }

  setStrategy(strategyName: string) {
    this.strategy = this.strategies.find((strategy) => strategy.constructor.name === strategyName);

    if (!this.strategy) throw new Error(`Strategy ${strategyName} not found`);
  }

  async getAll() {
    return this.tagRepository.getAll();
  }

  async create(tags: Tag[], categoryId: string) {
    await Promise.all(tags.map(async (item) => await this.strategy.create(item, categoryId)));
  }

  async update(tags: Tag[], ownerId: string) {
    const actions = {
      create: this.strategy.create,
      update: this.strategy.update,
      remove: this.strategy.remove,
    };

    await Promise.all(tags.map(async (item) => actions[item.status]?.bind(this)(item, ownerId)));
    await this.tagRepository.removeUnused();
  }

  async delete(ownerId: string) {
    await this.strategy.delete(ownerId);
  }
}
