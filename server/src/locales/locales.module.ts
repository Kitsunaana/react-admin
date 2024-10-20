import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AltNameCategory, Locale } from '../entities/locale.entity';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';

@Module({
  providers: [LocalesService],
  controllers: [LocalesController],
  exports: [LocalesService],
  imports: [SequelizeModule.forFeature([Locale, AltNameCategory])],
})
export class LocalesModule {}
