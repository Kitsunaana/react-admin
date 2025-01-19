import { Module } from '@nestjs/common';
import {
  SequelizeModule as SequelizeModulePackage,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Models } from '../../entities';
import { ModelCtor } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModulePackage.forRootAsync({
      useFactory: (): SequelizeModuleOptions => {
        return {
          username: process.env.DATABASE_USERNAME as string,
          password: process.env.DATABASE_PASSWORD as string,
          database: process.env.DATABASE_NAME as string,
          host: process.env.DATABASE_HOST as string,
          dialect: 'postgres' as const,
          port: Number(process.env.DATABASE_PORT) as number,
          models: Models as ModelCtor[],
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          sync: {
            alter: true,
            // force: true,
          },
        };
      },
    }),
  ],
})
export class SequelizeModule {}
