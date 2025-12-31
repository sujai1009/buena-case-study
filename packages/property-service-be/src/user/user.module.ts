import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeedService } from './user.seed.service';
import { BuildingModule } from 'src/building/building.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserSeedService],
  imports: [TypeOrmModule.forFeature([User]), BuildingModule],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
