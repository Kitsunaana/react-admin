import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { CharacteristicsModule } from '../characteristics/characteristics.module';
import { Category } from '../entities/category.entity';
import { CustomCategory } from '../entities/custom-category';
import { FilesModule } from '../files/files.module';
import { AltNameModule } from '../alt-name/alt-name.module';
import { SequelizeModule as BaseSequelizeModule } from '../shared/sequelize/sequelize.module';
import { TagsModule } from '../tags/tags.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryTag } from '../entities/category-tag.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryCustomRepository } from './repositories/category-custom.repository';
import { CategoryGetAllCommand } from './commands/category-get-all.command';
import { CategoryGetByIdCommand } from './commands/category-get-by-id.command';
import { CategoryGetAllCommandImpl } from './interfaces/category-get-all.command.interface';
import { CategoryGetByIdCommandImpl } from './interfaces/category-get-by-id.command.interface';
import { CategoryRepositoryImpl } from './interfaces/category.repository.interface';
import { CategoryCustomRepositoryImpl } from './interfaces/category-custom.repository.interface';
import { CategoryFacade } from './facades/categories.facade';
import { CategoryTagStrategy } from './strategies/category-tag.strategy';
import { CategoryCharacteristicStrategy } from './strategies/category-characteristic.strategy';
import { CategoryAltNameStrategy } from './strategies/category-alt-name.strategy';
import { CategoryAltName } from '../entities/category-alt-name.entity';
import { CategoryCharacteristic } from '../entities/category-characteristic.entity';

@Module({
  providers: [
    {
      provide: CategoriesService,
      inject: [CategoryCustomRepository, CategoryRepository],
      useFactory: (
        categoryCustomRepository: CategoryCustomRepositoryImpl,
        categoryRepository: CategoryRepositoryImpl,
      ) => {
        return new CategoriesService(categoryCustomRepository, categoryRepository);
      },
    },
    {
      provide: CategoryRepository,
      inject: [CategoryGetAllCommand, CategoryGetByIdCommand, getModelToken(Category)],
      useFactory: (
        categoryGetAll: CategoryGetAllCommandImpl,
        categoryGetById: CategoryGetByIdCommandImpl,
        categoryModel: typeof Category,
      ) => {
        console.log(categoryModel);
        return new CategoryRepository(categoryGetAll, categoryGetById, categoryModel);
      },
    },
    CategoryAltNameStrategy,
    CategoryCharacteristicStrategy,
    CategoryTagStrategy,
    CategoryFacade,
    CategoryGetByIdCommand,
    CategoryGetAllCommand,
    CategoryCustomRepository,
  ],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([
      Category,
      CustomCategory,
      CategoryTag,
      CategoryCharacteristic,
      CategoryAltName,
    ]),
    FilesModule,
    BaseSequelizeModule,
    CharacteristicsModule,
    AltNameModule,
    TagsModule,
  ],
})
export class CategoriesModule {}
