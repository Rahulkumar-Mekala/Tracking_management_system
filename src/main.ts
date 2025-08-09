import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors();

 
  const config = new DocumentBuilder()
    .setTitle('Bus Tracking API') 
    .setDescription('API documentation for the Bus Tracking System')
    .setVersion('1.0')
    .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', 
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access-token',
  )
    .build();

  const document = SwaggerModule.createDocument(app, config);

 
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.PORT ?? 3000;
  const HOST = process.env.HOST ??  '192.168.1.35';

  await app.listen(PORT, HOST);

  console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
  console.log(`📘 Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
}
bootstrap();
