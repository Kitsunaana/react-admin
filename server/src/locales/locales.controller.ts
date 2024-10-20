import { Controller, Get, Param } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { translate } from './translate';

@Controller('api/locales')
export class LocalesController {
  constructor(private localeService: LocalesService) {}

  @Get('/:lng')
  getLanguage(@Param() { lng }: { lng: string }) {
    return translate[lng];
  }

  @Get('')
  getAll() {
    return this.localeService.getAll();
  }
}
