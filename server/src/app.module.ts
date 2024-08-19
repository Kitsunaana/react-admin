import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { LocalesModule } from './locales/locales.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from './sequelize/sequelize.module';
import { CharacteristicsModule } from './characteristcs/characteristics.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    FilesModule,
    CategoriesModule,
    LocalesModule,
    SequelizeModule,
    CharacteristicsModule,
  ],
})
export class AppModule {}
