import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Good } from '../entities/good.entity';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [GoodsService],
  controllers: [GoodsController],
  imports: [SequelizeModule.forFeature([Good]), FilesModule],
})
export class GoodsModule {}
