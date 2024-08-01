import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { TypeormModule } from './typeorm/typeorm.module';
import { DataSource } from 'typeorm';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { LocalesModule } from './locales/locales.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeormModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CategoriesModule,
    LocalesModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
