import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Motor Insurance API')
    .setDescription('API documentation for motor insurance premium')
    .setVersion('1.0')
    .addTag('authorization (jwtoken)', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MzY0MjcwMzgsImV4cCI6MTc1NjY0NDU5NCwiYXVkIjoiIiwic3ViIjoibW9ja0FkbWluVG9rZW4iLCJyb2xlIjoiYWRtaW4ifQ.-WDS_q46W-g2JoAP5AzxgJDSp0IPgaNs0sv45guIOyw')
    .addTag('product')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
