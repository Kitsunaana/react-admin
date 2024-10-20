import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Good } from '../entities/good.entity';
import { FilesModule } from '../files/files.module';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  providers: [GoodsService],
  controllers: [GoodsController],
  imports: [SequelizeModule.forFeature([Good]), FilesModule],
})
export class GoodsModule {}
