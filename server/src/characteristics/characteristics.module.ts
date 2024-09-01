import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryCharacteristic, Characteristic } from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import { CharacteristicsController } from './characteristcs.controller';

@Module({
  providers: [CharacteristicsService],
  exports: [CharacteristicsService],
  imports: [SequelizeModule.forFeature([Characteristic, Unit, CategoryCharacteristic])],
  controllers: [CharacteristicsController],
})
export class CharacteristicsModule {}
