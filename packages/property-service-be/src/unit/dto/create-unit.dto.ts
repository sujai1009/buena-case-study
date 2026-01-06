import { IsNotEmpty } from "class-validator";
import { EntranceType } from "../entities/entrance.type";
import { UnitStatus } from "../entities/unit.status";
import { UnitType } from "../entities/unit.type";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitDto {
    @ApiProperty()
    @IsNotEmpty()
    buildingId: number;

    @ApiProperty()
    tenantId: number;
    
    @ApiProperty()
    @IsNotEmpty()
    type: UnitType;

    @ApiProperty()
    @IsNotEmpty()
    uNo : number;

    @ApiProperty()
    @IsNotEmpty()
    floor : string;

    @ApiProperty()
    entrance: EntranceType
    
    @ApiProperty()
    @IsNotEmpty()
    size: number;

    @ApiProperty()
    coOwnershipShare : number;
    
    @ApiProperty()
    builtYear: number;

    @ApiProperty()
    @IsNotEmpty()
    rooms: number;
    
    @ApiProperty()
    status: UnitStatus = UnitStatus.ADDED;
}
