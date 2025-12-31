import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PaginationRequest } from 'src/common/pagination-request-dto';
export declare class BuildingController {
    private readonly buildingService;
    constructor(buildingService: BuildingService);
    create(createBuildingDto: CreateBuildingDto): Promise<"Building cannot be saved as Property info is null" | import("./entities/building.entity").Building>;
    findAll(paginationRequest: PaginationRequest): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: string): Promise<import("./entities/building.entity").Building | null>;
    update(id: string, updateBuildingDto: UpdateBuildingDto): string;
    remove(id: string): Promise<void>;
}
