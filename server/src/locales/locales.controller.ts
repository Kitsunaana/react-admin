import { Controller, Get, Param } from '@nestjs/common';
import { Locale } from '../shared/types/types';
import { LocalesService } from './locales.service';
import { translate } from './translate';

@Controller('locales')
export class LocalesController {
  constructor(private localeService: LocalesService) {}

  @Get('/:lng')
  getLanguage(@Param() { lng }: { lng: string }) {
    return translate[lng];
  }

  @Get('')
  getAll(): Promise<Locale[]> {
    return this.localeService.getAll();
  }
}
