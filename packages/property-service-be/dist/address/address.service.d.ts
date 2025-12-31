import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
export declare class AddressService {
    private readonly addressRepository;
    constructor(addressRepository: Repository<Address>);
    create(createPropertyDto: CreatePropertyDto): Promise<Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address | null>;
    update(id: number): string;
    remove(id: number): Promise<void>;
}
