import { forwardRef, Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Building } from './entities/building.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from 'src/property/property.module';
import { UserModule } from 'src/user/user.module';
import { AddressModule } from 'src/address/address.module';
import { UnitModule } from 'src/unit/unit.module';

@Module({
  controllers: [BuildingController],
  providers: [BuildingService],
  imports: [TypeOrmModule.forFeature([Building]), forwardRef(() => PropertyModule), forwardRef(() => UnitModule), AddressModule],
  exports: [TypeOrmModule, BuildingService]
})
export class BuildingModule {}
