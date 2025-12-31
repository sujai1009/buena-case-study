import { Address } from "src/address/entities/address.entity";
import { BaseId } from "src/common/base-id";
import { Property } from "src/property/entities/property.entity";
import { Unit } from "src/unit/entities/unit.entity";
export declare class Building extends BaseId {
    name: string;
    houseNumber: string;
    address: Address;
    property: Property;
    units: Unit[];
}
