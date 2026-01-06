import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './config/database.configuration';
import { PropertyModule } from './property/property.module';
import { UnitModule } from './unit/unit.module';
import { BuildingModule } from './building/building.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './config/global.error.handler';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const ENV = process.env.NODE_ENV?.trim();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${ENV}`],
      // envFilePath : !ENV ? '.env' : `.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    PropertyModule,
    UnitModule,
    BuildingModule,
    UserModule,
    AddressModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [{
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }, AppService],
})
export class AppModule {}
