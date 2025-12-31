import { BaseId } from "src/common/base-id";
import { UserType } from "./user.type";
export declare class User extends BaseId {
    name: string;
    type: UserType;
}
