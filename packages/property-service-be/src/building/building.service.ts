import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Property } from 'src/property/entities/property.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { PropertyService } from 'src/property/property.service';
import { PaginationResponse } from 'src/common/pagination-response-dto';
import { BuildingPageReq } from './dto/building-page-request-dto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);

  constructor(
      @InjectRepository(Building)
      private buildingRepository: Repository<Building>,
      @Inject(forwardRef(() => UnitService))  private readonly unitService: UnitService,
      @Inject(forwardRef(() => PropertyService)) private readonly propertyService: PropertyService,
      @Inject(forwardRef(() => AddressService)) private readonly addressService: AddressService
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    this.logger.log("create=", createBuildingDto);
    if (!createBuildingDto.propertyId) {
      return "Building cannot be saved as Property info is null";
    }

    const property = await this.propertyService.findOne(createBuildingDto.propertyId);
    if (!property) {
      return "Building cannot be saved as Property info is null";
    }
    
    const address = await this.addressService.createFromBuildingDto(createBuildingDto);
    const building = new Building();
    building.property = property;
    building.name = createBuildingDto.name;
    building.houseNumber = createBuildingDto.houseNumber;
    building.address = address;

    await this.buildingRepository.save(building);

    if (createBuildingDto.isbulkCreation) {
      building.units = await this.createMultipleUnits(createBuildingDto.totalUnits, building);
      await this.buildingRepository.save(building);
    }

    return await this.findOne(building.id);
  }

  async createMany(totalBuildings: number, property: Property, address: Address): Promise<Building[]> {
    this.logger.log("createMany");
    let buildings= [] as Building[];

    const result = await this.buildingRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    const maxId = result.length > 0 ? result[0].id : 0;

    for(var i=0; i< totalBuildings; i++) {
      const houseNumber = maxId + i + 1 + "";
      const name = "TEMP_BUILDING_NAME_" + houseNumber;
      buildings.push(await this.buildingRepository.create({ houseNumber, name, property, address}));
    }

    await this.buildingRepository.save(buildings);
    return buildings;
  }

  async findAll(buildingPage: BuildingPageReq) : Promise<PaginationResponse> {
    const { limit = 10, offset = 0 } = buildingPage;
    this.logger.log("findAll ", buildingPage);

    const [buildings, total] = await this.buildingRepository.findAndCount({
      relations: {
          property: true,
          //units: true,
          address: true,
      },
      where: {
          property: {
              id: buildingPage.propertyId,
          },
      },
      take: limit,
      skip: offset,
    });

    return PaginationResponse.getPageable(buildings, total, limit, offset);
  }

  async findOne(id: number) {
    this.logger.log("findOne")
    return await this.buildingRepository.findOne({
      where: { id },
      relations: {
        units: true,
        address: true,
        property:true
      },
    });
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    this.logger.log("update")
    const building = await this.findOne(id);
    if ( !building) {
      throw new NotFoundException("No building with id found id=" + id);
    }
    Object.assign(building, updateBuildingDto);
    await this.buildingRepository.save(building);

    if (updateBuildingDto.isbulkCreation && updateBuildingDto.totalUnits) {
      building.units = await this.createMultipleUnits(updateBuildingDto.totalUnits, building);
      await this.buildingRepository.save(building);
    }

    return building;
  }

  async updateMany(updateBuildingDtos: UpdateBuildingDto[]) {
    this.logger.log("updateMany")
    const ids = updateBuildingDtos.map(d => d.id);
    const buildings = await this.buildingRepository.findBy({ id: In(ids) });
    const map = new Map(updateBuildingDtos.map(d => [d.id, d]));

    for (const b of buildings) {
      Object.assign(b, map.get(b.id));
    }

    await this.buildingRepository.save(buildings);
    return await this.buildingRepository.findBy({
      id : In(ids)
    });
  }

  async remove(id: number): Promise<void> {
    this.logger.log("remove")
    await this.buildingRepository.delete(id);
  }

  async createMultipleUnits(totalUnits: number, building: Building): Promise<Unit[]> {
    this.logger.log("createMultipleUnits")
    return await this.unitService.createMany(totalUnits, building);
  }
}
