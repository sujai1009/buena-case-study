import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PaginationRequest } from 'src/common/pagination-request-dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(createUnitDto: CreateUnitDto): Promise<"Unit cannot be saved as Building info is null" | "Building cannot be saved as Property info is null" | import("./entities/unit.entity").Unit>;
    findAll(paginationRequest: PaginationRequest): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: string): Promise<import("./entities/unit.entity").Unit | null>;
    update(id: string, updateUnitDto: UpdateUnitDto): string;
    remove(id: string): Promise<void>;
}
