import {Entity,Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {StorageEntity} from "./storage.entity";
import {CashesEntity} from "./cashes.entity";
import {UsersEntity} from "./users.entity";
import {GoodEntity} from "./good.entity";
import {CustomersEntity} from "./customers.entity";
import {TransactionsEntity} from "./transactions.entity";
import {PaymentsEntity} from "./payments.entity";
import {ExitedTransactionEntity} from "./exited-transaction.entity";


@Entity({name:"DOMAINS"})
export class DomainsEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;
    @Column({type: "numeric",nullable:true,name:'DOM_ID'})
    DOM_ID?: number|null;
    @Column({type:'nvarchar',length:50,nullable:true,name:'CODE'})
    CODE?: string|null;
    @Column({type:'nvarchar',length:150,nullable:true,name:'NAME'})
    NAME?: string|null;
    @Column({type:'nvarchar',length:150,nullable:true,name:'TITLE'})
    TITLE?: string|null;
    @Column({type:'int', default:1, nullable:true,name:'IS_ACTIVE'})
    IS_ACTIVE?: boolean|null;
    @Column({type:'int',nullable:true,name:'ORDERING'})
    ORDERING?: number|null;
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


    @OneToMany(() => StorageEntity, storage => storage.DOM_ID_TYPE)
    STORAGE_DOM_ID_TYPE?: StorageEntity[];

    @OneToMany(() => CashesEntity, cash => cash.DOM_ID_TYPE)
    CASHES_DOM_ID_TYPE?:CashesEntity[];

    @OneToMany(() => UsersEntity, user => user.DOM_ID_USER_TYPE)
    USER_DOM_ID_TYPE?:UsersEntity[];

    @OneToMany(() => UsersEntity, user => user.DOM_ID_GENDER)
    USER_DOM_ID_GENDER?:UsersEntity[];

    @OneToMany(() => GoodEntity, good => good.DOM_ID_TYPE)
    GOOD_DOM_ID_TYPE?:GoodEntity[];

    @OneToMany(() => CustomersEntity, customer => customer.DOM_ID_GENDER)
    CUSTOMER_DOM_ID_GENDER?:CustomersEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_GOLD_ACCOUNT_TYPE)
    TRANSACTION_DOM_ID_GOLD_ACCOUNT_TYPE?:TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_GOLD_TYPE)
    TRANSACTION_DOM_ID_GOLD_TYPE?:TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_ORDER_GEM_TYPE)
    TRANSACTION_DOM_ID_ORDER_GEM_TYPE?:TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_EXCHANGE_TYPE)
    TRANSACTION_DOM_ID_EXCHANGE_TYPE?:TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_ORDER_TYPE)
    TRANSACTION_DOM_ID_ORDER_TYPE?:TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, transaction => transaction.DOM_ID_ACCOUNT_TYPE)
    TRANSACTION_DOM_ID_ACCOUNT_TYPE?:TransactionsEntity[];

    @OneToMany(() => PaymentsEntity, payment => payment.DOM_ID_TRANSFER_TYPE)
    PAYMENT_DOM_ID_TRANSFER_TYPE?:PaymentsEntity[];

    @OneToMany(() => PaymentsEntity, payment => payment.DOM_ID_PAYMENT_TYPE)
    PAYMENT_DOM_ID_PAYMENT_TYPE?:PaymentsEntity[];

    @OneToMany(() => PaymentsEntity, payment => payment.DOM_ID_BEHALF_TYPE)
    PAYMENT_DOM_ID_BEHALF_TYPE?:PaymentsEntity[];

}
