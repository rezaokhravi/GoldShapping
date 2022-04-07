import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"EXITED_TRANSACTION"})
export class ExitedTransactionEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @Column({type: "numeric",nullable:true,name:'GOOD_ID'})
    GOOD_ID?: number;

    @Column({type: "numeric",nullable:true,name:'STORAGE_ID'})
    STORAGE_ID?: number;

    @Column({type: "decimal",nullable:true,name:'WEIGHT'})
    WEIGHT?: number|null;

    @Column({type: "int",nullable:true,name:'COUNT'})
    COUNT?: number|null;

    @Column({type:'nvarchar',length:500,nullable:true,name:'DESCRIPTION'})
    DESCRIPTION?: string|null;

    @Column({ type: "numeric",nullable:true,name:'USE_ID_CREATOR'})
    USE_ID_CREATOR?: number|null;

    @Column({ type: "numeric",nullable:true,name:'CREATE_DATE_TIME'})
    CREATE_DATE_TIME?: number|null;

    @Column({ type: "numeric",nullable:true,name:'MODIFY_USE_ID'})
    MODIFY_USE_ID?: number|null;

    @Column({ type: "numeric",nullable:true,name:'MODIFY_DATE_TIME'})
    MODIFY_DATE_TIME?: number|null;
}
