import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Characteristic } from './domain/characteristic.entity';
import { Unit } from './domain/units.entity';
import { CharacteristicsController } from './characteristcs.controller';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicRepository } from './repositories/characteristic.repository';
import { UnitRepository } from './repositories/unit.repository';
import { CategoryCharacteristic } from '../entities/category-characteristic.entity';
import { ICharacteristicRepositoryImpl } from './interfaces/characteristic.repository.interface';
import { IUnitRepositoryImpl } from './interfaces/unit.repository.interface';

@Module({
  providers: [
    CharacteristicRepository,
    UnitRepository,
    {
      provide: CharacteristicsService,
      inject: [CharacteristicRepository, UnitRepository],
      useFactory: (...args: [ICharacteristicRepositoryImpl, IUnitRepositoryImpl]) =>
        new CharacteristicsService(...args),
    },
  ],
  exports: [CharacteristicsService],
  imports: [SequelizeModule.forFeature([Characteristic, Unit, CategoryCharacteristic])],
  controllers: [CharacteristicsController],
})
export class CharacteristicsModule {}
