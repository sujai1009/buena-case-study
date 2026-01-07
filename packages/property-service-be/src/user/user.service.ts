import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserType } from './entities/user.type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

  create(createUserDto: CreateUserDto) {
    this.logger.log("create");
    return 'This action adds a new user';
  }

  async findAll() {
    this.logger.log("findAll");
    return await this.userRepository.findBy({ type: In([UserType.Accountant, UserType.Manager]) });
  }

  async findUsersByIds(ids: number[]) {
    this.logger.log("findUsersByIds", ids);
    const results = await this.userRepository.findBy({ id: In(ids) });
    return  new Map(results.map(obj => [obj.id, obj]))
  }

  findOne(id: number) {
    this.logger.log("findOne");
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log("update");
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.logger.log("remove");
    return `This action removes a #${id} user`;
  }
}
