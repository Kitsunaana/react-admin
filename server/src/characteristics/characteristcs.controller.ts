import { Controller, Get } from '@nestjs/common';
import { CharacteristicRepository } from './repository/characteristic';
import { UnitRepository } from './repository/unit';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private unitRepository: UnitRepository,
    private characteristicRepository: CharacteristicRepository,
  ) {}

  @Get('')
  getAllCharacteristics() {
    return this.characteristicRepository.getAll();
  }

  @Get('units')
  getAllUnits() {
    return this.unitRepository.getAll();
  }
}
