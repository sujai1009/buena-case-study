import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyPageReq } from './dto/property-page-request-dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): Promise<import("./entities/property.entity").Property | null>;
    findAll(paginationRequest: PropertyPageReq): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: number): Promise<import("./entities/property.entity").Property | null>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<import("./entities/property.entity").Property | "No Property with id found">;
    updateMany(updatePropertyDtos: UpdatePropertyDto[]): Promise<import("./entities/property.entity").Property[]>;
    remove(id: string): Promise<void>;
}
