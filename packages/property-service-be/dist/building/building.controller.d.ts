import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingPageReq } from './dto/building-page-request-dto';
export declare class BuildingController {
    private readonly buildingService;
    constructor(buildingService: BuildingService);
    create(createBuildingDto: CreateBuildingDto): Promise<import("./entities/building.entity").Building | "Building cannot be saved as Property info is null" | null>;
    findAll(buildingPage: BuildingPageReq): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: string): Promise<import("./entities/building.entity").Building | null>;
    update(id: string, updateBuildingDto: UpdateBuildingDto): Promise<import("./entities/building.entity").Building | "No building with id found">;
    updateMany(updateBuildingDtos: UpdateBuildingDto[]): Promise<import("./entities/building.entity").Building[]>;
    remove(id: string): Promise<void>;
}
