import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AltNameController } from './alt-name.controller';
import { AltNameService } from './alt-name.service';
import { LocaleRepository } from './repositories/locale.repository';
import { Locale } from './domain/locale.entity';

@Module({
  providers: [AltNameService, LocaleRepository],
  controllers: [AltNameController],
  exports: [AltNameService],
  imports: [SequelizeModule.forFeature([Locale])],
})
export class AltNameModule {}
