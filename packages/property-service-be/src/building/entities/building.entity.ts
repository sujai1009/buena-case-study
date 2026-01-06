import { Address } from "src/address/entities/address.entity";
import { BaseId } from "src/common/base-id";
import { Property } from "src/property/entities/property.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";


@Entity()
@Index(["houseNumber", "property.id"], { unique: true })
export class Building extends BaseId {
    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    houseNumber: string;

    @ManyToOne(() => Address, (address) => address.buildings)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @ManyToOne(() => Property, property => property.buildings, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @OneToMany(() => Unit, (unit) => unit.building, { lazy: true, onDelete: "CASCADE" })
    units: Unit[];
}