import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { FilesModule } from '../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeModule as BaseSequelizeModule } from '../sequelize/sequelize.module';
import { Category } from '../entities-sequelize/category.entity';
import { CustomCategory } from '../entities-sequelize/custom-category';
import { CharacteristicsModule } from '../characteristics/characteristics.module';
import { LocalesModule } from '../locales/locales.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category, CustomCategory]),
    FilesModule,
    BaseSequelizeModule,
    CharacteristicsModule,
    LocalesModule,
    TagsModule,
  ],
})
export class CategoriesModule {}
