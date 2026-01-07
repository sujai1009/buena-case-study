import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Building } from 'src/building/entities/building.entity';
import { BuildingService } from 'src/building/building.service';
import { PaginationResponse } from 'src/common/pagination-response-dto';
import { UnitPageReq } from './dto/unit-page-request-dto';
export declare class UnitService {
    private readonly unitRepository;
    private readonly buildingService;
    private readonly logger;
    constructor(unitRepository: Repository<Unit>, buildingService: BuildingService);
    create(createUnitDto: CreateUnitDto): Promise<Unit | "Unit cannot be saved as Building info is null" | "Building cannot be saved as Property info is null" | null>;
    createMany(totalUnits: number, building: Building): Promise<Unit[]>;
    findAll(paginationRequest: UnitPageReq): Promise<PaginationResponse>;
    findOne(id: number): Promise<Unit | null>;
    update(id: number, updateUnitDto: UpdateUnitDto): Promise<Unit | null>;
    updateMany(updateUnitDtos: UpdateUnitDto[]): Promise<Unit[]>;
    remove(id: number): Promise<void>;
}
