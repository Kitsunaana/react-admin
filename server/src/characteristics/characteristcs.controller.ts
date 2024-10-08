import { Controller, Get } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { UnitRepository } from './repository/unit';
import { CharacteristicRepository } from './repository/characteristic';

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
