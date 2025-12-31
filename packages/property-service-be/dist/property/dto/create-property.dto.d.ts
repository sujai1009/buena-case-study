import { PropertyType } from "../entities/property.type";
export declare class CreatePropertyDto {
    name: string;
    type: PropertyType;
    manager: number;
    accountant: number;
    isbulkCreation: boolean;
    totalBuildings: number;
    street: string;
    city: string;
    country: string;
    zipcode: number;
}
