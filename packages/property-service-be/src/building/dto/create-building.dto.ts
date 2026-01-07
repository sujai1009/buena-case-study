import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto {
    @ApiProperty()
    @IsNotEmpty()
    propertyId: number;
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    houseNumber: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    zipcode: number;

    @ApiProperty()
    manager: number;

    @ApiProperty()
    isbulkCreation: boolean = false;

    @ApiProperty()
    totalUnits: number;
}
