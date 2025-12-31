import { forwardRef, Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Unit } from './entities/unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from 'src/building/building.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [TypeOrmModule.forFeature([Unit]), forwardRef(() => BuildingModule), forwardRef(() => UserModule)],
  exports: [TypeOrmModule, UnitService]
})
export class UnitModule {}
