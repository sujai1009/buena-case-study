import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Property } from 'src/property/entities/property.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { PropertyService } from 'src/property/property.service';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';

@Injectable()
export class BuildingService {
  constructor(
      @InjectRepository(Building)
      private buildingRepository: Repository<Building>,
      @Inject(forwardRef(() => UnitService))  private readonly unitService: UnitService,
      @Inject(forwardRef(() => PropertyService)) private readonly propertyService: PropertyService
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    if (!createBuildingDto.propertyId) {
      return "Building cannot be saved as Property info is null";
    }

    const property = await this.propertyService.findOne(createBuildingDto.propertyId);
    if (!property) {
      return "Building cannot be saved as Property info is null";
    }
    
    const building = new Building();
    building.property = property;
    building.name = createBuildingDto.name;
    building.houseNumber = createBuildingDto.houseNumber;
    //building.manager = users[createBuildingDto.manager];

    await this.buildingRepository.save(building);

    if (createBuildingDto.isbulkCreation) {
      building.units = await this.createMultipleUnits(createBuildingDto.totalUnits, building);
      await this.buildingRepository.save(building);
    } 

    return building;
  }

  async createMany(totalBuildings: number, property: Property, address: Address): Promise<Building[]> {
    let buildings= [] as Building[];
    for(var i=0; i< totalBuildings; i++) {
      buildings.push(await this.buildingRepository.create({ property, address}));
    }

    await this.buildingRepository.save(buildings);
    return buildings;
  }

  async findAll(paginationRequest: PaginationRequest) : Promise<PaginationResponse> {
    const { limit = 10, offset = 0 } = paginationRequest;

    const [buildings, total] = await this.buildingRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return PaginationResponse.getPageable(buildings, total, limit, offset);
  }

  findOne(id: number) {
    return this.buildingRepository.findOneBy({id});
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  async remove(id: number): Promise<void> {
    await this.buildingRepository.delete(id);
  }

  async createMultipleUnits(totalUnits: number, building: Building): Promise<Unit[]> {
    return await this.unitService.createMany(totalUnits, building);
  }
}
