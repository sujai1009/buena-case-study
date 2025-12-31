import { forwardRef, Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from './entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AddressModule } from 'src/address/address.module';
import { BuildingModule } from 'src/building/building.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), forwardRef(() => BuildingModule) , UserModule, AddressModule],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [TypeOrmModule, PropertyService]
})
export class PropertyModule {}
