import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { TypeormModule } from './typeorm/typeorm.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeormModule, ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }), UsersModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
