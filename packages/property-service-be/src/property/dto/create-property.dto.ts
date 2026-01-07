
import { ApiProperty } from "@nestjs/swagger";
import { PropertyType } from "../entities/property.type";
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PropertyType)
    type: PropertyType;

    @ApiProperty()
    @IsNotEmpty()
    manager: number;

    @ApiProperty()
    @IsNotEmpty()
    accountant: number;

    @ApiProperty()
    @IsNotEmpty()
    fileId: number;

    @ApiProperty()
    isbulkCreation: boolean = false;

    @ApiProperty()
    totalBuildings: number;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    zipcode: number;
}
