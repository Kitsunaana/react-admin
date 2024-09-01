import { Module } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { LocalesController } from './locales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AltNameCategory, Locale } from '../entities/locale.entity';

@Module({
  providers: [LocalesService],
  controllers: [LocalesController],
  exports: [LocalesService],
  imports: [SequelizeModule.forFeature([Locale, AltNameCategory])],
})
export class LocalesModule {}
