import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Characteristic } from './domain/characteristic.entity';
import { Unit } from './domain/units.entity';
import { CharacteristicsController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { CharacteristicRepository } from './repositories/characteristic.repository';
import { UnitRepository } from './repositories/unit.repository';
import { ICharacteristicRepositoryImpl } from './interfaces/characteristic.repository.interface';
import { IUnitRepositoryImpl } from './interfaces/unit.repository.interface';

@Module({
  providers: [
    CharacteristicRepository,
    UnitRepository,
    {
      provide: CharacteristicService,
      inject: [CharacteristicRepository, UnitRepository],
      useFactory: (...args: [ICharacteristicRepositoryImpl, IUnitRepositoryImpl]) =>
        new CharacteristicService(...args),
    },
  ],
  exports: [CharacteristicService],
  imports: [SequelizeModule.forFeature([Characteristic, Unit])],
  controllers: [CharacteristicsController],
})
export class CharacteristicModule {}
