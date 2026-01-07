import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitPageReq } from './dto/unit-page-request-dto';
export declare class UnitController {
    private readonly unitService;
    private readonly logger;
    constructor(unitService: UnitService);
    create(createUnitDto: CreateUnitDto): Promise<import("./entities/unit.entity").Unit | "Unit cannot be saved as Building info is null" | "Building cannot be saved as Property info is null" | null>;
    findAll(paginationRequest: UnitPageReq): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: string): Promise<import("./entities/unit.entity").Unit | null>;
    update(id: string, updateUnitDto: UpdateUnitDto): Promise<import("./entities/unit.entity").Unit | null>;
    updateMany(updateUnitDtos: UpdateUnitDto[]): Promise<import("./entities/unit.entity").Unit[]>;
    remove(id: string): Promise<void>;
}
