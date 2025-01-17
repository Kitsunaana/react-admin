import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { CoreModule } from './core/core.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(CoreModule, { cors: true });

  app.enableCors();

  await app.listen(PORT, () => console.log(`PORT ${PORT}`));
}

start();
