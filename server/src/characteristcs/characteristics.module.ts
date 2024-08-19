import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  CategoryCharacteristic,
  Characteristic,
} from '../entities-sequelize/characteristic.entity';
import { Unit } from '../entities-sequelize/units.entity';

@Module({
  providers: [CharacteristicsService],
  exports: [CharacteristicsService],
  imports: [SequelizeModule.forFeature([Characteristic, Unit, CategoryCharacteristic])],
})
export class CharacteristicsModule {}
