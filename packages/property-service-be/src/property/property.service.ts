import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { In, Repository } from 'typeorm';
import { BuildingService } from 'src/building/building.service';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { Building } from 'src/building/entities/building.entity';
import { PaginationResponse } from 'src/common/pagination-response-dto';
import { User } from 'src/user/entities/user.entity';
import { PropertyPageReq } from './dto/property-page-request-dto';
import { PropertyType } from './entities/property.type';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PropertyService {

  private readonly logger = new Logger(PropertyService.name);

  constructor(
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
      @Inject(forwardRef(() => BuildingService)) private readonly buildingService: BuildingService,
      private readonly userService: UserService,
      private readonly addressService: AddressService,
      private readonly fileService: FileService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    this.logger.log("create ", createPropertyDto);
    const users = await this.userService.findUsersByIds([createPropertyDto.manager, createPropertyDto.accountant]);
    
    const property = new Property();
    if(createPropertyDto.fileId) {
        this.logger.log("File present to update ", createPropertyDto.fileId);
        const aggrementFile = await this.fileService.findOne(createPropertyDto.fileId);
        (aggrementFile ? property.aggrementFile = aggrementFile : null);
    }

    property.name = createPropertyDto.name;
    property.type = createPropertyDto.type;
    property.accountant = users.get(createPropertyDto.accountant) as User;
    property.manager = users.get(createPropertyDto.manager) as User;

    await this.propertyRepository.save(property);

    if (createPropertyDto.isbulkCreation) {
      const address = await this.addressService.createFromPropertyDto(createPropertyDto);
      property.buildings = await this.createMultipleBuildings(createPropertyDto.totalBuildings, property, address);
      await this.propertyRepository.save(property);
    } 

    return await this.findOne(property.id);
  }

  async findAll(paginationRequest: PropertyPageReq) : Promise<PaginationResponse> {
    this.logger.log("findAll");
    const { limit = 10, offset = 0 } = paginationRequest;

    let whereClause = {};
    const type = paginationRequest.type;
    if (type) { 
      if (type === "weg") {
          whereClause = { type : PropertyType.WEG}
      } else if (type === "mv") {
          whereClause = { type : PropertyType.MV}
      }
    }
    
    const [properties, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: offset,
      where: whereClause,
      relations: {
        //buildings: true,
        aggrementFile: true
      },
    });

    return PaginationResponse.getPageable(properties, total, limit, offset);
  }

  findOne(id: number) {
    this.logger.log("findOne");
    return this.propertyRepository.findOne({
      where: { id },
      relations: {
        buildings: true,
      },
    });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    this.logger.log("update ", id, updatePropertyDto);
    const property = await this.findOne(id);
    if ( !property) {
      throw new NotFoundException("No Property with id found," + id);
    }

    if(updatePropertyDto.fileId && property.aggrementFile.id != updatePropertyDto.fileId) {
        const aggrementFile = await this.fileService.findOne(updatePropertyDto.fileId);
        (aggrementFile ? property.aggrementFile = aggrementFile : null);
    }
  
    Object.assign(property, updatePropertyDto);
    await this.propertyRepository.save(property);

    return property;
  }

  async updateMany(updatePropertyDtos: UpdatePropertyDto[]) {
    this.logger.log("updateMany ", updatePropertyDtos);
      const ids = updatePropertyDtos.map(d => d.id);
      const units = await this.propertyRepository.findBy({ id: In(ids) });
      const map = new Map(updatePropertyDtos.map(d => [d.id, d]));
  
      for (let u of units) {
        Object.assign(u, map.get(u.id));
      }
  
      await this.propertyRepository.save(units);
      return await this.propertyRepository.findBy({
        id : In(ids)
      });
    }

  async remove(id: number): Promise<void> {
    this.logger.log("remove ", id);
    await this.propertyRepository.delete(id);
  }

  async createMultipleBuildings(totalBuildings: number, property: Property, address: Address): Promise<Building[]> {
    this.logger.log("createMultipleBuildings");
    return await this.buildingService.createMany(totalBuildings, property, address);
  }
}

