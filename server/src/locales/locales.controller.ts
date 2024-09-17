import { Controller, Get, Param } from '@nestjs/common';
import { LocalesService } from './locales.service';

@Controller('api/locales')
export class LocalesController {
  constructor(private localeService: LocalesService) {}

  @Get('/:lng')
  getLanguage(@Param() lng: string) {
    return {
      catalog: {
        // top: { search: 'Поиск' },
        // rows: { count: 'Всего <strong>{{value}}</strong> элементов' },
      },
      goods: { table: { row: { category: 'Категория <strong>{{value}}</strong>' } } },
    };
  }

  @Get('')
  getAll() {
    return this.localeService.getAll();
  }
}
