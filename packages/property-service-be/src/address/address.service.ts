import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
import { BuildingService } from 'src/building/building.service';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';

@Injectable()
export class AddressService {

  constructor(
      @InjectRepository(Address)
      private readonly addressRepository: Repository<Address>,
      //@Inject(forwardRef(() => BuildingService)) private readonly buildingService: BuildingService,
  ) {}

  async createFromBuildingDto(createBuildingDto: CreateBuildingDto) {
    console.log(createBuildingDto);
    const address = new Address();
    address.street = createBuildingDto.street;
    address.city = createBuildingDto.city;
    address.code = createBuildingDto.zipcode;
    address.country = createBuildingDto.country;

    return await this.findOrCreateAddress(address);
  }

  async createFromPropertyDto(createPropertyDto: CreatePropertyDto) {
    const address = new Address();
    address.street = createPropertyDto.street;
    address.city = createPropertyDto.city;
    address.code = createPropertyDto.zipcode;
    address.country = createPropertyDto.country;

    return await this.findOrCreateAddress(address);
  }

  async findOrCreateAddress(address: Address): Promise<Address> {
    // 1. Try to find the user by email
    const addressFound = await this.addressRepository.findOneBy({ ...address });

    // 2. If found, return it; otherwise, create and save a new one
    if (addressFound) {
        return addressFound;
    } else {
        // Create a new user object with provided data and email
        const newAddress = this.addressRepository.create({ ...address });
        return this.addressRepository.save(newAddress);
    }
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
