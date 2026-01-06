import { Building } from "src/building/entities/building.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UnitType } from "./unit.type";
import { EntranceType } from "./entrance.type";
import { UnitStatus } from "./unit.status";
import { User } from "src/user/entities/user.entity";
import { BaseId } from "src/common/base-id";

@Entity()
@Index(["uNo", "building.id"], { unique: true })
export class Unit extends BaseId {
    @Column({
        type: 'int',
        nullable: true,
        transformer: {
            to: (value: UnitType) => value,
            from: (value: number) => UnitType[value],
        },
    })
    type: UnitType;

    @Column({
        nullable: true
    })
    uNo : number // Unit number
    
    @Column({
        nullable: true
    })
    floor : string
    
    @Column({
        type: 'int',
        nullable: true,
        transformer: {
            to: (value: EntranceType) => value,
            from: (value: number) => EntranceType[value],
        },
    })
    entrance: EntranceType
    
    @Column({
        nullable: true
    })
    size: number
    
    @Column({
        nullable: true
    })
    coOwnershipShare : number
    
    @Column({
        nullable: true
    })
    builtYear: number
    
    @Column({
        nullable: true
    })
    rooms: number

    @Column({
        type: 'int',
        transformer: {
            to: (value: UnitStatus) => value,
            from: (value: number) => UnitStatus[value],
        },
    })
    status: UnitStatus

    @OneToOne(() => User)
    @JoinColumn({ name: 'tenant_id' })
    tenant: User;
    
    @ManyToOne(() => Building, building => building.units, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'building_id' })
    building: Building;
}
