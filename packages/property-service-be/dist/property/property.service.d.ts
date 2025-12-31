import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { BuildingService } from 'src/building/building.service';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { Building } from 'src/building/entities/building.entity';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';
export declare class PropertyService {
    private readonly propertyRepository;
    private readonly buildingService;
    private readonly userService;
    private readonly addressService;
    constructor(propertyRepository: Repository<Property>, buildingService: BuildingService, userService: UserService, addressService: AddressService);
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    findAll(paginationRequest: PaginationRequest): Promise<PaginationResponse>;
    findOne(id: number): Promise<Property | null>;
    update(id: number, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: number): Promise<void>;
    createMultipleBuildings(totalBuildings: number, property: Property, address: Address): Promise<Building[]>;
}
