
import { Property } from "../entities/property.entity";
import { PropertyType } from "../entities/property.type";
import { IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: PropertyType;

    @IsNotEmpty()
    manager: number;

    @IsNotEmpty()
    accountant: number;

    isbulkCreation: boolean = false;
    totalBuildings: number;
    street: string;
    city: string;
    country: string;
    zipcode: number;
}
