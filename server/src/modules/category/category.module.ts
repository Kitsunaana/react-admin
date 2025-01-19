import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Category } from './domain/category.entity';
import { CustomCategory } from './domain/custom-category';
import { AltNameModule } from '../alt-name/alt-name.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryTag } from './domain/category-tag.entity';
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
import { CategoryAltName } from './domain/category-alt-name.entity';
import { CategoryCharacteristic } from './domain/category-characteristic.entity';
import { CharacteristicModule } from '../characteristic/characteristic.module';
import { TagsModule } from '../tag/tags.module';

@Module({
  providers: [
    {
      provide: CategoryService,
      inject: [CategoryCustomRepository, CategoryRepository],
      useFactory: (...args: [CategoryCustomRepositoryImpl, CategoryRepositoryImpl]) =>
        new CategoryService(...args),
    },
    {
      provide: CategoryRepository,
      inject: [CategoryGetAllCommand, CategoryGetByIdCommand, getModelToken(Category)],
      useFactory: (
        ...args: [CategoryGetAllCommandImpl, CategoryGetByIdCommandImpl, typeof Category]
      ) => new CategoryRepository(...args),
    },
    CategoryAltNameStrategy,
    CategoryCharacteristicStrategy,
    CategoryTagStrategy,
    CategoryFacade,
    CategoryGetByIdCommand,
    CategoryGetAllCommand,
    CategoryCustomRepository,
  ],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([
      Category,
      CustomCategory,
      CategoryTag,
      CategoryCharacteristic,
      CategoryAltName,
    ]),
    CharacteristicModule,
    AltNameModule,
    TagsModule,
  ],
})
export class CategoryModule {}
