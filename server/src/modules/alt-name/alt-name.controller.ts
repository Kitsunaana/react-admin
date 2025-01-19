import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AltNameService } from './alt-name.service';
import { translate } from './assets/translate';
import { getTranslatesInput, IGetTranslateInput } from './inputs/translate.input';
import { Locale } from './domain/locale.entity';
import { createLocaleInput, ICreateLocaleInput } from './inputs/create-locale.input';
import { validation } from '../../shared/validations/zod.validation';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe';

@Controller('alt-names')
export class AltNameController {
  public constructor(private localeService: AltNameService) {}

  @Get('/:lng')
  public translates(@Param('lng') lng: IGetTranslateInput) {
    return translate[validation(getTranslatesInput, lng)];
  }

  @Get()
  public getAll(): Promise<Locale[]> {
    return this.localeService.getAll();
  }

  @Post()
  public createLocale(@Body(new ZodValidationPipe(createLocaleInput)) input: ICreateLocaleInput) {
    return this.localeService.createLocaleCollect(input);
  }
}
