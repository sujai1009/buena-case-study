import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

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

    // @ApiProperty()
    // @IsNotEmpty()
    // address: CreateAddressDto;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    zipcode: number;

    @ApiProperty()
    //@IsNotEmpty()
    manager: number;

    @ApiProperty()
    isbulkCreation: boolean = false;

    @ApiProperty()
    totalUnits: number;
}
