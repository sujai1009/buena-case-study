import { BaseId } from "src/common/base-id";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PropertyType } from "./property.type";
import { Building } from "src/building/entities/building.entity";
import { User } from "src/user/entities/user.entity";
import { UploadFile } from "src/file/entities/upload.file.entity";

@Entity()
export class Property extends BaseId {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    //@Column("enum", { enum: PropertyType })
    @Column({
        type: 'int',
        transformer: {
            to: (value: PropertyType) => value,
            from: (value: number) => PropertyType[value],
        },
    })
    type: PropertyType;

    //@ManyToOne(() => User, (user) => user.managers, { eager: true })
    @ManyToOne(() => User, (user) => user.managers)
    @JoinColumn({ name: 'manager_id' })
    manager: User;

    //@ManyToOne(() => User, (user) => user.accountants, { eager: true })
    @ManyToOne(() => User, (user) => user.accountants)
    @JoinColumn({ name: 'accountant_id' })
    accountant: User;

    // @OneToOne(() => User)
    // @JoinColumn({ name: 'accountant_id' })
    // accountant: User;

    @OneToMany(() => Building, (building) => building.property)
    buildings: Building[];

    @OneToOne(() => UploadFile, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'file_id' })
    aggrementFile: UploadFile;

    // @OneToMany(() => Building, (building) => building.property, { lazy: true})
    // buildings: Promise<Building[]>;
}
