import { Controller, Get, Param } from '@nestjs/common';
import { AltNameService } from './alt-name.service';
import { translate } from './assets/translate';
import { getTranslatesInput, IGetTranslateInput } from './inputs/translate.input';
import { validation } from '../shared/validations/zod.validation';
import { Locale } from './domain/locale.entity';

@Controller('alt-names')
export class AltNameController {
  public constructor(private localeService: AltNameService) {}

  @Get('/:lng')
  public translates(@Param('lng') lng: IGetTranslateInput) {
    return translate[validation(getTranslatesInput, lng)];
  }

  @Get()
  public async getAll(): Promise<Locale[]> {
    return await this.localeService.getAll();
  }
}
