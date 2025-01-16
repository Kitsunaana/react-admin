import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AltNameController } from './alt-name.controller';
import { AltNameService } from './alt-name.service';
import { LocaleRepository } from './repositories/locale.repository';
import { Locale } from './domain/locale.entity';

@Module({
  providers: [
    LocaleRepository,
    {
      provide: AltNameService,
      inject: [LocaleRepository],
      useFactory: (localeRepository: LocaleRepository) => new AltNameService(localeRepository),
    },
  ],
  controllers: [AltNameController],
  exports: [AltNameService],
  imports: [SequelizeModule.forFeature([Locale])],
})
export class AltNameModule {}
