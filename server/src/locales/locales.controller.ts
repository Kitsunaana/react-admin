import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/locales')
export class LocalesController {
  @Get('/:ru')
  getLanguage(@Param() value: string) {
    return { catalog: { rows: { count: 'Всего <strong>{{value}}</strong> элементов' } } };
  }
}
