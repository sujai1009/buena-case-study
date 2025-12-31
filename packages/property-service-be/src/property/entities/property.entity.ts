import { BaseId } from "src/common/base-id";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { PropertyType } from "./property.type";
import { Building } from "src/building/entities/building.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Property extends BaseId {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: false
    })
    type: PropertyType;

    @OneToOne(() => User)
    @JoinColumn({ name: 'manager_id' })
    manager: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'accountant_id' })
    accountant: User;

    @OneToMany(() => Building, (building) => building.property)
    buildings: Building[];
}
