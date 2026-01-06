import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserType } from './entities/user.type';

@Injectable()
export class UserService {
  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // const results = await this.userRepository.findBy({ type: In([UserType.Accountant, UserType.Manager]) });
    // const results = await this.userRepository.find();
    //console.log("In user service", results);
    // const mapData = new Map(results.map(obj => [obj.type, obj]))
    // console.log(mapData)
    // return mapData;
    return await this.userRepository.findBy({ type: In([UserType.Accountant, UserType.Manager]) });
  }

  async findUsersByIds(ids: number[]) {
    const results = await this.userRepository.findBy({ id: In(ids) });
    return  new Map(results.map(obj => [obj.id, obj]))
    //return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
