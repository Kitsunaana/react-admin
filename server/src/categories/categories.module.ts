import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { FilesModule } from '../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([Category]), FilesModule],
})
export class CategoriesModule {}
