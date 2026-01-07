import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Property } from 'src/property/entities/property.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { PropertyService } from 'src/property/property.service';
import { PaginationResponse } from 'src/common/pagination-response-dto';
import { BuildingPageReq } from './dto/building-page-request-dto';
import { AddressService } from 'src/address/address.service';
export declare class BuildingService {
    private buildingRepository;
    private readonly unitService;
    private readonly propertyService;
    private readonly addressService;
    private readonly logger;
    constructor(buildingRepository: Repository<Building>, unitService: UnitService, propertyService: PropertyService, addressService: AddressService);
    create(createBuildingDto: CreateBuildingDto): Promise<Building | "Building cannot be saved as Property info is null" | null>;
    createMany(totalBuildings: number, property: Property, address: Address): Promise<Building[]>;
    findAll(buildingPage: BuildingPageReq): Promise<PaginationResponse>;
    findOne(id: number): Promise<Building | null>;
    update(id: number, updateBuildingDto: UpdateBuildingDto): Promise<Building>;
    updateMany(updateBuildingDtos: UpdateBuildingDto[]): Promise<Building[]>;
    remove(id: number): Promise<void>;
    createMultipleUnits(totalUnits: number, building: Building): Promise<Unit[]>;
}
