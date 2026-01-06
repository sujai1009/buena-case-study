import { Building } from "src/building/entities/building.entity";
import { BaseId } from "src/common/base-id";
export declare class Address extends BaseId {
    street: string;
    city: string;
    code: number;
    country: string;
    buildings: Building[];
}
