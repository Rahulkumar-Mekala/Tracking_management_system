import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const PORT = process.env.PORT ?? 3000;
 const HOST = process.env.HOST ?? '192.168.0.74'; 
 
  await app.listen(PORT, HOST);

  console.log(`Server is running at http://${HOST}:${PORT}`);
}
bootstrap();
