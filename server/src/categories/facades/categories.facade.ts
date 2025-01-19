import { CategoriesService } from '../categories.service';
import { FilesService } from '../../files/files.service';
import { CharacteristicsService } from '../../characteristics/characteristics.service';
import { AltNameService } from '../../alt-name/alt-name.service';
import { TagsService } from '../../tags/tags.service';
import { IPostCategoryInput } from '../dto/inputs/post-category.input';
import { CategoryTagStrategy } from '../strategies/category-tag.strategy';
import { IUpdateCategoryInput } from '../dto/inputs/update-category.input';
import { Injectable } from '@nestjs/common';
import { CategoryCharacteristicStrategy } from '../strategies/category-characteristic.strategy';
import { CategoryTag } from 'src/entities/category-tag.entity';
import { CategoryAltName } from '../../entities/category-alt-name.entity';
import { CategoryAltNameStrategy } from '../strategies/category-alt-name.strategy';
import { CategoryCharacteristic } from '../../entities/category-characteristic.entity';

@Injectable()
export class CategoryFacade {
  constructor(
    private categoryService: CategoriesService,
    private filesService: FilesService,

    private tagsService: TagsService<CategoryTag>,
    private altNameService: AltNameService<CategoryAltName>,
    private characteristicsService: CharacteristicsService<CategoryCharacteristic>,

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
