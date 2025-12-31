import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationRequest } from 'src/common/pagination-request-dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): Promise<import("./entities/property.entity").Property>;
    findAll(paginationRequest: PaginationRequest): Promise<import("../common/pagination-response-dto").PaginationResponse>;
    findOne(id: string): Promise<import("./entities/property.entity").Property | null>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: string): Promise<void>;
}
