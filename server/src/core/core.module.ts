import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from '../shared/utils/is-dev.util';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './configs/get-sequelize.config';
import { CategoryModule } from '../modules/category/category.module';
import { AltNameModule } from '../modules/alt-name/alt-name.module';
import { CharacteristicModule } from '../modules/characteristic/characteristic.module';
import { TagsModule } from '../modules/tag/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    CategoryModule,
    AltNameModule,
    CharacteristicModule,
    TagsModule,
  ],
})
export class CoreModule {}
