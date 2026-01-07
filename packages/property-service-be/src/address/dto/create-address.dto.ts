import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @ApiProperty()
    @IsNotEmpty()
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    zipcode: number;

    @ApiProperty()
    @IsNotEmpty()
    country: string;
}
