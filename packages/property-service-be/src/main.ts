import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Buena GmbH')
    .setDescription('Property Management Application')
    .setVersion('1.0')
    // .addTag('property')
    // .addTag('management')
    // .addTag('units')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('api', app, documentFactory);

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
