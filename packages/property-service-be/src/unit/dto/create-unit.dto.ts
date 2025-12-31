import { IsNotEmpty } from "class-validator";
import { EntranceType } from "../entities/entrance.type";
import { UnitStatus } from "../entities/unit.status";
import { UnitType } from "../entities/unit.type";

export class CreateUnitDto {
    @IsNotEmpty()
    buildingId: number;
    tenantId: number;
    
    @IsNotEmpty()
    type: UnitType;

    @IsNotEmpty()
    uNo : number;

    @IsNotEmpty()
    floor : string;

    entrance: EntranceType
    
    @IsNotEmpty()
    size: number;

    coOwnershipShare : number;
    
    builtYear: number;

    @IsNotEmpty()
    rooms: number;
    
    status: UnitStatus = UnitStatus.ADDED;
}
