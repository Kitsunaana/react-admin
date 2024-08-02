import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { InjectConnection } from '@nestjs/sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
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
        logging: false,
        sync: {
          alter: true,
          // force: true,
        },
      }),
    }),
  ],
})
export class SequelizeModule {
  constructor(@InjectConnection() private sequelize: Sequelize) {
    this.configure();
  }

  async configure(): Promise<void> {
    const umzug = new Umzug({
      migrations: { glob: 'src/database/migrations/*.ts' },
      context: this.sequelize,
      logger: console,
      storage: new SequelizeStorage({
        sequelize: this.sequelize,
        modelName: 'SequelizeMeta',
      }),
    });

    console.log(1);
    await umzug.up();
  }
}
