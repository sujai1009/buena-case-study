import { BaseId } from "src/common/base-id";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class UploadFile extends BaseId {
    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    originalname: string;

    @Column({
        nullable: false,
    })
    path: string;

    @Column({
        nullable: false,
    })
    size: number;
}
