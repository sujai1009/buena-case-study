import { EntranceType } from "../entities/entrance.type";
import { UnitStatus } from "../entities/unit.status";
import { UnitType } from "../entities/unit.type";
export declare class CreateUnitDto {
    buildingId: number;
    tenantId: number;
    type: UnitType;
    uNo: number;
    floor: string;
    entrance: EntranceType;
    size: number;
    coOwnershipShare: number;
    builtYear: number;
    rooms: number;
    status: UnitStatus;
}
