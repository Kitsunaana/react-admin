/*
import { config } from 'dotenv';
import { join } from 'path';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) throw new Error('Database URL is empty');

  const prodRead = configService.get('IS_PRODUCTION');
  const isProd = prodRead === 'false' ? false : prodRead === 'true';

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: !isProd,
    entities: [join(process.cwd(), 'dist', 'entities', '**', '*.entity.{ts,js}')],
    migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export const appDataSource = new DataSource(options());
*/
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ENTITIES } from '../entities';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Database URL is empty');
  }
  return {
    url,
    type: 'postgres',
    schema: 'public',
    // logging: configService.get('IS_PRODUCTION') === 'false',
    logging: true,
    entities: ENTITIES,
    migrationsRun: true,
    migrationsTableName: 'migrations',
    synchronize: true,
  };
};

export const appDataSource = new DataSource(options());
