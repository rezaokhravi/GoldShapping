import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {StorageEntity} from "./storage.entity";
import {CashesEntity} from "./cashes.entity";
import {UsersEntity} from "./users.entity";
import {GoodEntity} from "./good.entity";
import {CustomersEntity} from "./customers.entity";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"PAYMENTS"})
export class PaymentsEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @Column({type:'numeric',nullable:true,name:'TRANSACTION_ID'})
    TRANSACTION_ID?: number|null;

    @Column({type:'numeric',nullable:true,name:'CUSTOMER_ID'})
    CUSTOMER_ID?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.PAYMENT_DOM_ID_TRANSFER_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_TRANSFER_TYPE'})
    @JoinColumn({ name: "DOM_ID_TRANSFER_TYPE" })
    DOM_ID_TRANSFER_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.PAYMENT_DOM_ID_PAYMENT_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_PAYMENT_TYPE'})
    @JoinColumn({ name: "DOM_ID_PAYMENT_TYPE" })
    DOM_ID_PAYMENT_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.PAYMENT_DOM_ID_BEHALF_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_BEHALF_TYPE'})
    @JoinColumn({ name: "DOM_ID_BEHALF_TYPE" })
    DOM_ID_BEHALF_TYPE?: number|null;

    @Column({type: "decimal",nullable:true,name:'PRICE'})
    PRICE?:number|null;

    @Column({type: "decimal",nullable:true,name:'CASH_ID'})
    CASH_ID?:number|null;

    @Column({type: "decimal",nullable:true,name:'ACCOUNT_RESIDUAL'})
    ACCOUNT_RESIDUAL?: number|null;

    @Column({type: "bit",default:0,nullable:true,name:'IS_SETTLE'})
    IS_SETTLE?: boolean|null;

    @Column({type: "decimal",nullable:true,name:'CASH_CREATURE'})
    CASH_CREATURE?: number|null;

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
