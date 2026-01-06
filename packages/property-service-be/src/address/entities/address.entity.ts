import { Building } from "src/building/entities/building.entity";
import { BaseId } from "src/common/base-id";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
@Index(["street", "city", "country", "code"], { unique: true })
export class Address extends BaseId {
    @Column({
        nullable: false
    })
    street: string;

    @Column({
        nullable: false
    })
    city: string;

    @Column({
        nullable: false
    })
    code: number;

    @Column({
        nullable: false
    })
    country: string;

    @OneToMany(() => Building, (building) => building.address)
    buildings: Building[];
}
