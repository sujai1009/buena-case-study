import { BaseId } from "src/common/base-id";
import { Column, Entity, OneToMany } from "typeorm";
import { UserType } from "./user.type";
import { Property } from "src/property/entities/property.entity";

@Entity()
export class User extends BaseId {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    // @Column({
    //     nullable: false
    // })
    @Column({
        nullable: false,
        type: 'int',
        transformer: {
            to: (value: UserType) => value,
            from: (value: number) => UserType[value],
        },
    })
    type: UserType;

    @OneToMany(() => Property, (propManagers) => propManagers.manager)
    managers: Property[];

    @OneToMany(() => Property, (propAccountantss) => propAccountantss.accountant)
    accountants: Property[];
}
