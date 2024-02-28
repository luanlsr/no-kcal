import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    // origin: 'https://main--no-kcal.netlify.app',
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use(cors(corsOptions))

  await app.listen(process.env.PORT || 3001);
  console.log(`Listen in port: ${process.env.PORT}`);

}
bootstrap();
