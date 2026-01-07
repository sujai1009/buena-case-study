import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';

@Injectable()
export class AddressService {

  private readonly logger = new Logger(AddressService.name);

  constructor(
      @InjectRepository(Address)
      private readonly addressRepository: Repository<Address>
  ) {}

  async createFromBuildingDto(createBuildingDto: CreateBuildingDto) {
    this.logger.log("createFromBuildingDto=", createBuildingDto);
    const address = new Address();
    address.street = createBuildingDto.street;
    address.city = createBuildingDto.city;
    address.code = createBuildingDto.zipcode;
    address.country = createBuildingDto.country;

    return await this.findOrCreateAddress(address);
  }

  async createFromPropertyDto(createPropertyDto: CreatePropertyDto) {
    this.logger.log("createFromPropertyDto=", createPropertyDto);
    const address = new Address();
    address.street = createPropertyDto.street;
    address.city = createPropertyDto.city;
    address.code = createPropertyDto.zipcode;
    address.country = createPropertyDto.country;

    return await this.findOrCreateAddress(address);
  }

  async findOrCreateAddress(address: Address): Promise<Address> {
    this.logger.log("findOrCreateAddress=", address);
    const addressFound = await this.addressRepository.findOneBy({ ...address });
    if (addressFound) {
        return addressFound;
    } else {
        const newAddress = this.addressRepository.create({ ...address });
        return this.addressRepository.save(newAddress);
    }
  }


  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return this.addressRepository.findOneBy({id});
  }

  update(id: number) {
    return `This action updates a #${id} property`;
  }

  async remove(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
