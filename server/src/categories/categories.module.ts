import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DbModule } from '../db/db.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [DbModule],
})
export class CategoriesModule {}
