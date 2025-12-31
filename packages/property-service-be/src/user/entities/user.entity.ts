import { BaseId } from "src/common/base-id";
import { Column, Entity } from "typeorm";
import { UserType } from "./user.type";

@Entity()
export class User extends BaseId {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: false
    })
    type: UserType;
}
