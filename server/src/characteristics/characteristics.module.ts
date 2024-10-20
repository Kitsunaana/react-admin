import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryCharacteristic, Characteristic } from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import { CharacteristicsController } from './characteristcs.controller';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicRepository } from './repository/characteristic';
import { UnitRepository } from './repository/unit';

@Module({
  providers: [CharacteristicsService, UnitRepository, CharacteristicRepository],
  exports: [CharacteristicsService],
  imports: [SequelizeModule.forFeature([Characteristic, Unit, CategoryCharacteristic])],
  controllers: [CharacteristicsController],
})
export class CharacteristicsModule {}
