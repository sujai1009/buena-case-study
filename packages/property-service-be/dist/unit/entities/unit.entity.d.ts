import { Building } from "src/building/entities/building.entity";
import { UnitType } from "./unit.type";
import { EntranceType } from "./entrance.type";
import { UnitStatus } from "./unit.status";
import { User } from "src/user/entities/user.entity";
import { BaseId } from "src/common/base-id";
export declare class Unit extends BaseId {
    type: UnitType;
    uNo: number;
    floor: string;
    entrance: EntranceType;
    size: number;
    coOwnershipShare: number;
    builtYear: number;
    rooms: number;
    status: UnitStatus;
    tenant: User;
    building: Building;
}
