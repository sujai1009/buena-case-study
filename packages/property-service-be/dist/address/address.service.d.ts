import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';
export declare class AddressService {
    private readonly addressRepository;
    constructor(addressRepository: Repository<Address>);
    createFromBuildingDto(createBuildingDto: CreateBuildingDto): Promise<Address>;
    createFromPropertyDto(createPropertyDto: CreatePropertyDto): Promise<Address>;
    findOrCreateAddress(address: Address): Promise<Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address | null>;
    update(id: number): string;
    remove(id: number): Promise<void>;
}
