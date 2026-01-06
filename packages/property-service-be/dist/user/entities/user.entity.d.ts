import { BaseId } from "src/common/base-id";
import { UserType } from "./user.type";
import { Property } from "src/property/entities/property.entity";
export declare class User extends BaseId {
    name: string;
    type: UserType;
    managers: Property[];
    accountants: Property[];
}
