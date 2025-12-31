import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto {
    @IsNotEmpty()
    propertyId: number;
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    houseNumber: string;

    @IsNotEmpty()
    manager: number;

    isbulkCreation: boolean = false;
    totalUnits: number;
}
