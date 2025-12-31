import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Property } from 'src/property/entities/property.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { PropertyService } from 'src/property/property.service';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';
export declare class BuildingService {
    private buildingRepository;
    private readonly unitService;
    private readonly propertyService;
    constructor(buildingRepository: Repository<Building>, unitService: UnitService, propertyService: PropertyService);
    create(createBuildingDto: CreateBuildingDto): Promise<"Building cannot be saved as Property info is null" | Building>;
    createMany(totalBuildings: number, property: Property, address: Address): Promise<Building[]>;
    findAll(paginationRequest: PaginationRequest): Promise<PaginationResponse>;
    findOne(id: number): Promise<Building | null>;
    update(id: number, updateBuildingDto: UpdateBuildingDto): string;
    remove(id: number): Promise<void>;
    createMultipleUnits(totalUnits: number, building: Building): Promise<Unit[]>;
}
