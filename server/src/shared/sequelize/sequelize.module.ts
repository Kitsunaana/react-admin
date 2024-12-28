import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';
import { Models } from '../../entities';

@Module({
  imports: [
    SequelizeModulePackage.forRootAsync({
      imports: undefined,
      useFactory: () => {
        console.log({
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          host: process.env.DATABASE_HOST,
        });
        return {
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          host: process.env.DATABASE_HOST,
          dialect: 'postgres',
          port: Number(process.env.DATABASE_PORT),
          models: Models,
          autoLoadModels: true,
          synchronize: true,
          logging: console.log,
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
