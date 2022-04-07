import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"REPORTS"})
export class ReportsEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @Column({type:'numeric',name:'TRANSACTION_ID'})
    TRANSACTION_ID?: number|null;

    @Column({type:'decimal',nullable:true,name:'PROFIT'})
    PROFIT?: number|null;

    @Column({type:'decimal',nullable:true,name:'PAY'})
    PAY?: number|null;

    @Column({type:'decimal',nullable:true,name:'TAX'})
    TAX?: number|null;

    @Column({type:'decimal',nullable:true,name:'TOTAL_AMOUNT'})
    TOTAL_AMOUNT?: number|null;

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
