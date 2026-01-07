import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './entities/user.type';

@Injectable()
export class UserSeedService implements OnModuleInit {

  private readonly logger = new Logger(UserSeedService.name);

  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


  async onModuleInit() {
    this.logger.log(`The module has been initialized.`);

    const users = this.getUserData();
    let newUsersToCreate:any = [];

    for (var i = 0; i < users.length; i++) {
      const existingUser = await this.userRepository.findBy(users[i]);
      if (existingUser.length == 0) {
          newUsersToCreate.push(users[i]);
        }
    }

    this.logger.log("New users to create",  newUsersToCreate);
    if (newUsersToCreate.length > 0) {
      await this.userRepository.insert(newUsersToCreate);
    }
  }

  getUserData() {
    return [
      { name: 'manager',type: UserType.Manager},
      { name: 'manager1',type: UserType.Manager},
      { name: 'manager2',type: UserType.Manager},
      { name: 'accountant',type: UserType.Accountant},
      { name: 'accountant1',type: UserType.Accountant},
      { name: 'accountant2',type: UserType.Accountant},
      { name: 'owner',type: UserType.Owner},
      { name: 'owner1',type: UserType.Owner},
      { name: 'owner2',type: UserType.Owner},
      { name: 'tenant',type: UserType.Tenant},
      { name: 'tenant1',type: UserType.Tenant},
      { name: 'tenant2',type: UserType.Tenant}
    ];
  }
}
