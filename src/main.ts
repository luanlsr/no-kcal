import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000' || 'https://no-kcal.netlify.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
