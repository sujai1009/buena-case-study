import { Building } from "src/building/entities/building.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UnitType } from "./unit.type";
import { EntranceType } from "./entrance.type";
import { UnitStatus } from "./unit.status";
import { User } from "src/user/entities/user.entity";
import { BaseId } from "src/common/base-id";

@Entity()
export class Unit extends BaseId {
    @Column({
        nullable: false
    })
    type: UnitType;

    @Column()
    uNo : number // Unit number
    
    @Column()
    floor : string
    
    @Column()
    entrance: EntranceType
    
    @Column()
    size: number
    
    @Column()
    coOwnershipShare : number
    
    @Column()
    builtYear: number
    
    @Column()
    rooms: number

    @Column()
    status: UnitStatus

    @OneToOne(() => User)
    @JoinColumn({ name: 'tenant_id' })
    tenant: User;
    
    @ManyToOne(() => Building, building => building.units)
    @JoinColumn({ name: 'building_id' })
    building: Building;
}
