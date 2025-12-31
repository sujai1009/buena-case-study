import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Building } from 'src/building/entities/building.entity';
import { BuildingService } from 'src/building/building.service';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';
export declare class UnitService {
    private readonly unitRepository;
    private readonly buildingService;
    constructor(unitRepository: Repository<Unit>, buildingService: BuildingService);
    create(createUnitDto: CreateUnitDto): Promise<"Unit cannot be saved as Building info is null" | "Building cannot be saved as Property info is null" | Unit>;
    createMany(totalUnits: number, building: Building): Promise<Unit[]>;
    findAll(paginationRequest: PaginationRequest): Promise<PaginationResponse>;
    findOne(id: number): Promise<Unit | null>;
    update(id: number, updateUnitDto: UpdateUnitDto): string;
    remove(id: number): Promise<void>;
}
