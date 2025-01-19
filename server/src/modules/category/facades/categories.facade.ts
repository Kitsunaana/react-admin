import { CategoryService } from '../category.service';
import { AltNameService } from '../../alt-name/alt-name.service';
import { IPostCategoryInput } from '../dto/inputs/post-category.input';
import { CategoryTagStrategy } from '../strategies/category-tag.strategy';
import { IUpdateCategoryInput } from '../dto/inputs/update-category.input';
import { Injectable } from '@nestjs/common';
import { CategoryCharacteristicStrategy } from '../strategies/category-characteristic.strategy';
import { CategoryAltName } from '../domain/category-alt-name.entity';
import { CategoryAltNameStrategy } from '../strategies/category-alt-name.strategy';
import { CategoryCharacteristic } from '../domain/category-characteristic.entity';
import { TagsService } from '../../tag/tags.service';
import { CategoryTag } from '../domain/category-tag.entity';
import { CharacteristicService } from '../../characteristic/characteristic.service';

@Injectable()
export class CategoryFacade {
  constructor(
    private categoryService: CategoryService,

    private tagsService: TagsService<CategoryTag>,
    private altNameService: AltNameService<CategoryAltName>,
    private characteristicsService: CharacteristicService<CategoryCharacteristic>,

    private categoryTagStrategy: CategoryTagStrategy,
    private categoryAltNameStrategy: CategoryAltNameStrategy,
    private categoryCharacteristicStrategy: CategoryCharacteristicStrategy,
  ) {}

  public async create(input: IPostCategoryInput) {
    this.tagsService.setStrategy(this.categoryTagStrategy);
    this.altNameService.setStrategy(this.categoryAltNameStrategy);
    this.characteristicsService.setStrategy(this.categoryCharacteristicStrategy);

    const categoryId = await this.categoryService.create(input);

    await this.tagsService.createCollect(input.tags, categoryId);
    await this.altNameService.createCollect(input.altNames, categoryId);
    await this.characteristicsService.createCollect(input.characteristics, categoryId);

    return await this.categoryService.getById(categoryId);
  }

  async update(input: IUpdateCategoryInput, id: string) {
    this.tagsService.setStrategy(this.categoryTagStrategy);
    this.altNameService.setStrategy(this.categoryAltNameStrategy);
    this.characteristicsService.setStrategy(this.categoryCharacteristicStrategy);

    await this.categoryService.update(input, id);

    await this.characteristicsService.updateCollect(input.characteristics, id);
    await this.altNameService.updateCollect(input.altNames, id);
    await this.tagsService.updateCollect(input.tags, id);

    return await this.categoryService.getById(id);
  }

  async delete(id: string) {
    this.tagsService.setStrategy(this.categoryTagStrategy);
    this.altNameService.setStrategy(this.categoryAltNameStrategy);
    this.characteristicsService.setStrategy(this.categoryCharacteristicStrategy);

    await this.categoryService.remove(id);
    await this.tagsService.removeCollect(id);
    await this.altNameService.removeCollect(id);
    await this.characteristicsService.removeCollect(id);

    return;
  }
}
