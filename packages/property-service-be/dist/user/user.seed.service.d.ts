import { OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './entities/user.type';
export declare class UserSeedService implements OnModuleInit {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    getUserData(): {
        name: string;
        type: UserType;
    }[];
}
