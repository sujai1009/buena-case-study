import { Address } from "src/address/entities/address.entity";
import { BaseId } from "src/common/base-id";
import { Property } from "src/property/entities/property.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";


@Entity()
export class Building extends BaseId {
    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    houseNumber: string;


    @OneToOne(() => Address)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @ManyToOne(() => Property, property => property.buildings)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @OneToMany(() => Unit, (unit) => unit.building)
    units: Unit[];
}