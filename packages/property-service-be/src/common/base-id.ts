import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseId {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @DeleteDateColumn()
    // deletedAt: Date;

    // @Column()
    // createdBy: string;
    
    // @Column()
    // updatedBy: string;
}