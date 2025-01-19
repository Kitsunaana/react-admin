import { Characteristic } from './domain/characteristic.entity';
import { Controller, Get } from '@nestjs/common';
import { CharacteristicRepository } from './repositories/characteristic.repository';
import { UnitRepository } from './repositories/unit.repository';
import { Unit } from './domain/units.entity';

@Controller('characteristics')
export class CharacteristicsController {
  public constructor(
    private unitRepository: UnitRepository,
    private characteristicRepository: CharacteristicRepository,
  ) {}

  @Get('')
  public getAllCharacteristics(): Promise<Characteristic[]> {
    return this.characteristicRepository.getAll();
  }

  @Get('units')
  public getAllUnits(): Promise<Unit[]> {
    return this.unitRepository.getAll();
  }
}
