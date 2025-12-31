import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './entities/user.type';

@Injectable()
export class UserSeedService implements OnModuleInit {

  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


  async onModuleInit() {
    console.log(`The module has been initialized.`);

    const users = this.getUserData();
    const userCount = await this.userRepository.count();
    console.log("Existing user count:" + userCount);

    if (userCount == 0) {
      await this.userRepository.insert(users);
    }
    console.log(await this.userRepository.find());
  }

  getUserData() {
    return [
      { name: 'manager',type: UserType.Manager},
      { name: 'accountant',type: UserType.Accountant},
      { name: 'owner',type: UserType.Owner},
      { name: 'tenant',type: UserType.Tenant}
    ];
  }
}
