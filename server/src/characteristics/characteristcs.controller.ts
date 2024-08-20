import { Controller, Get } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(private characteristicsService: CharacteristicsService) {}

  @Get('')
  getAllCharacteristics() {
    return this.characteristicsService.getAllCharacteristics();
  }

  @Get('units')
  getAllUnits() {
    return this.characteristicsService.getAllUnits();
  }
}
