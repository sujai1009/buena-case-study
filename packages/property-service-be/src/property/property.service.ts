import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { BuildingService } from 'src/building/building.service';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { Building } from 'src/building/entities/building.entity';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';

@Injectable()
export class PropertyService {

  constructor(
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
      @Inject(forwardRef(() => BuildingService)) private readonly buildingService: BuildingService,
      private readonly userService: UserService,
      private readonly addressService: AddressService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const address = await this.addressService.create(createPropertyDto);
    const users = await this.userService.findUsersByIds([createPropertyDto.manager, createPropertyDto.accountant]);

    const property = new Property();
    property.name = createPropertyDto.name;
    property.type = createPropertyDto.type;
    property.accountant = users[createPropertyDto.accountant];
    property.manager = users[createPropertyDto.manager];

    await this.propertyRepository.save(property);

    if (createPropertyDto.isbulkCreation) {
      property.buildings = await this.createMultipleBuildings(createPropertyDto.totalBuildings, property, address);
      await this.propertyRepository.save(property);
    } 

    return property;
  }

  async findAll(paginationRequest: PaginationRequest) : Promise<PaginationResponse> {
    const { limit = 10, offset = 0 } = paginationRequest;

    const [properties, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return PaginationResponse.getPageable(properties, total, limit, offset);
  }

  findOne(id: number) {
    return this.propertyRepository.findOneBy({id});
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: number): Promise<void> {
    await this.propertyRepository.delete(id);
  }

  async createMultipleBuildings(totalBuildings: number, property: Property, address: Address): Promise<Building[]> {
    return await this.buildingService.createMany(totalBuildings, property, address);
  }

}

