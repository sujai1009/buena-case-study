import { BaseId } from "src/common/base-id";
import { PropertyType } from "./property.type";
import { Building } from "src/building/entities/building.entity";
import { User } from "src/user/entities/user.entity";
import { UploadFile } from "src/file/entities/upload.file.entity";
export declare class Property extends BaseId {
    name: string;
    type: PropertyType;
    manager: User;
    accountant: User;
    buildings: Building[];
    aggrementFile: UploadFile;
}
