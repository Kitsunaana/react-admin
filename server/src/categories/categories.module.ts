import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharacteristicsModule } from '../characteristics/characteristics.module';
import { Category } from '../entities/category.entity';
import { CustomCategory } from '../entities/custom-category';
import { FilesModule } from '../files/files.module';
import { LocalesModule } from '../locales/locales.module';
import { SequelizeModule as BaseSequelizeModule } from '../sequelize/sequelize.module';
import { TagsModule } from '../tags/tags.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

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
