import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {StorageEntity} from "./storage.entity";
import {CashesEntity} from "./cashes.entity";
import {UsersEntity} from "./users.entity";
import {GoodEntity} from "./good.entity";
import {CustomersEntity} from "./customers.entity";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"TRANSACTIONS"})
export class TransactionsEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_ACCOUNT_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_ACCOUNT_TYPE'})
    @JoinColumn({ name: "DOM_ID_ACCOUNT_TYPE" })
    DOM_ID_ACCOUNT_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_EXCHANGE_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_EXCHANGE_TYPE'})
    @JoinColumn({ name: "DOM_ID_EXCHANGE_TYPE" })
    DOM_ID_EXCHANGE_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_ORDER_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_ORDER_TYPE'})
    @JoinColumn({ name: "DOM_ID_ORDER_TYPE" })
    DOM_ID_ORDER_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_GOLD_ACCOUNT_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_GOLD_ACCOUNT_TYPE'})
    @JoinColumn({ name: "DOM_ID_GOLD_ACCOUNT_TYPE" })
    DOM_ID_GOLD_ACCOUNT_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_GOLD_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_GOLD_TYPE'})
    @JoinColumn({ name: "DOM_ID_GOLD_TYPE" })
    DOM_ID_GOLD_TYPE?: number|null;

    @ManyToOne(() => DomainsEntity, domain => domain.TRANSACTION_DOM_ID_ORDER_GEM_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_ORDER_GEM_TYPE'})
    @JoinColumn({ name: "DOM_ID_ORDER_GEM_TYPE" })
    DOM_ID_ORDER_GEM_TYPE?: number|null;

    @Column({type: "numeric",nullable:true,name:'CUSTOMER_ID'})
    CUSTOMER_ID?: number|null;

    @Column({type: "decimal",nullable:true,name:'RECEIVED_STATEMENT'})
    RECEIVED_STATEMENT?: number|null;

    @Column({type: "numeric",nullable:true,name:'GOOD_ID'})
    GOOD_ID?: number|null;

    @Column({type: "numeric",nullable:true,name:'ORDER_MODEL'})
    ORDER_MODEL?: number|null;

    @Column({type: "decimal",nullable:true,name:'ORDER_SIZE'})
    ORDER_SIZE?: number|null;

    @Column({type: "decimal",nullable:true,name:'ORDER_GEM_WEIGHT'})
    ORDER_GEM_WEIGHT?: number|null;

    @Column({type: "nvarchar",length:10,nullable:true,name:'SETTLEMENT_DATE'})
    SETTLEMENT_DATE?: string|null;

    @Column({type: "decimal",nullable:true,name:'ACCOUNT_RESIDUAL'})
    ACCOUNT_RESIDUAL?: number|null;

    @Column({type: "decimal",nullable:true,name:'TOTAL_AMOUNT'})
    TOTAL_AMOUNT?: number|null;

    @Column({type: "bit",default:0,nullable:true,name:'MANUAL_TOTAL_AMOUNT'})
    MANUAL_TOTAL_AMOUNT?: boolean|null;

    @Column({type: "decimal",nullable:true,name:'WORK_WEIGHT'})
    WORK_WEIGHT?: number|null;

    @Column({type: "decimal",nullable:true,name:'WATER_UNDER'})
    WATER_UNDER?: number|null;

    @Column({type: "int",nullable:true,name:'ROVER'})
    ROVER?: number|null;

    @Column({type: "int",nullable:true,name:'ROVER_WEIGHT_18'})
    ROVER_WEIGHT_18?: number|null;

    @Column({type: "decimal",nullable:true,name:'MESGHAL_WEIGHT'})
    MESGHAL_WEIGHT?: number|null;

    @Column({type: "decimal",nullable:true,name:'MESGHAL_PRICE'})
    MESGHAL_PRICE?: number|null;

    @Column({type: "decimal",nullable:true,name:'GRAM_WEIGHT'})
    GRAM_WEIGHT?: number|null;

    @Column({type: "decimal",nullable:true,name:'GRAM_PRICE'})
    GRAM_PRICE?: number|null;

    @Column({type: "decimal",nullable:true,name:'PROFIT'})
    PROFIT?: number|null;

    @Column({type: "decimal",nullable:true,name:'PAY'})
    PAY?: number|null;

    @Column({type: "decimal",nullable:true,name:'TAX'})
    TAX?: number|null;

    @Column({type: "decimal",nullable:true,name:'GOLD_BOXER'})
    GOLD_BOXER?: number|null;

    @Column({type: "decimal",nullable:true,name:'DIFFERENT_WEIGHT'})
    DIFFERENT_WEIGHT?: number|null;

    @Column({type: "decimal",nullable:true,name:'GOLD_PRICE'})
    GOLD_PRICE?: number|null;

    @Column({type: "decimal",nullable:true,name:'GOLD_WEIGHT'})
    GOLD_WEIGHT?: number|null;

    @Column({type: "int",nullable:true,name:'COUNT'})
    COUNT?: number|null;

    @Column({type: "numeric",nullable:true,name:'STORAGE_ID'})
    STORAGE_ID?: number|null;

    @Column({type: "int",nullable:true,name:'ORDER_CODE'})
    ORDER_CODE?: number|null;

    @Column({type:'nvarchar',length:10,nullable:true,name:'ORDER_DATE'})
    ORDER_DATE?:string

    @Column({type: "numeric",nullable:true,name:'ORDER_ID'})
    ORDER_ID?: number|null;

    @Column({type: "bit",default:0,nullable:true,name:'IS_SETTLE'})
    IS_SETTLE?: boolean|null;

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
