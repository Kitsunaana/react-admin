import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { FilesModule } from './files/files.module';
import { LocalesModule } from './locales/locales.module';
import { SequelizeModule } from './shared/sequelize/sequelize.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot(),
    FilesModule,
    CategoriesModule,
    LocalesModule,
    SequelizeModule,
    CharacteristicsModule,
    TagsModule,
  ],
})
export class AppModule {}
