import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';
import { Models } from '../entities';

@Module({
  imports: [
    SequelizeModulePackage.forRootAsync({
      imports: undefined,
      useFactory: () => ({
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        host: '127.0.0.1',
        dialect: 'postgres',
        port: 8913,
        models: Models,
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
        sync: {
          alter: true,
        },
      }),
    }),
  ],
})
export class SequelizeModule {}
