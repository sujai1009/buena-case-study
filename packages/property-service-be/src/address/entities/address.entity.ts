import { BaseId } from "src/common/base-id";
import { Column, Entity } from "typeorm";

@Entity()
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
}
