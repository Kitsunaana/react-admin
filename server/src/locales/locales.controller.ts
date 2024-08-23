import { Controller, Get, Param } from '@nestjs/common';
import { LocalesService } from './locales.service';

@Controller('api/locales')
export class LocalesController {
  constructor(private localeService: LocalesService) {}

  @Get('/:ru')
  getLanguage(@Param() value: string) {
    return { catalog: { rows: { count: 'Всего <strong>{{value}}</strong> элементов' } } };
  }

  @Get('')
  getAll() {
    return this.localeService.getAll();
  }
}
