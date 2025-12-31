import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';

@Injectable()
export class AddressService {

  constructor(
      @InjectRepository(Address)
      private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const address = new Address();
    address.street = createPropertyDto.street;
    address.city = createPropertyDto.city;
    address.code = createPropertyDto.zipcode;
    address.country = createPropertyDto.country;

    return this.addressRepository.save(address);
  }

  findAll() {
    //return `This action returns all property`;
    return this.addressRepository.find();
  }

  findOne(id: number) {
    //return `This action returns a #${id} property`;
    return this.addressRepository.findOneBy({id});
  }

  update(id: number) {
    return `This action updates a #${id} property`;
  }

  async remove(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
