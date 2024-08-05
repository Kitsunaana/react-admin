import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';
import { Media } from '../entities-sequelize/media.entity';

@Module({
  imports: [
    SequelizeModulePackage.forRootAsync({
      useFactory: () => ({
        username: 'postgres',
        password: 'postgres',
        database: 'kitsunaana',
        host: '127.0.0.1',
        dialect: 'postgres',
        port: 5432,
        models: [Category, Media],
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
        sync: {
          alter: true,
          // force: true,
        },
      }),
    }),
  ],
})
export class SequelizeModule {}
