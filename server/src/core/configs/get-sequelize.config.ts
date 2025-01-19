import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Models } from '../entities';
import { ModelCtor } from 'sequelize-typescript';

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  username: configService.getOrThrow<string>('DATABASE_USERNAME'),
  password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
  database: configService.getOrThrow<string>('DATABASE_NAME'),
  host: configService.getOrThrow<string>('DATABASE_HOST'),
  dialect: 'postgres',
  port: Number(configService.getOrThrow<string>('DATABASE_PORT')),
  models: Models as ModelCtor[],
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  sync: {
    alter: true,
    // force: true,
  },
});
