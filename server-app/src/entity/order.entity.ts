import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {StorageEntity} from "./storage.entity";
import {CashesEntity} from "./cashes.entity";
import {UsersEntity} from "./users.entity";
import {GoodEntity} from "./good.entity";
import {CustomersEntity} from "./customers.entity";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"ORDER"})
export class OrderEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @Column({type:'numeric',nullable:true,name:'TRANSACTION_ID'})
    TRANSACTION_ID?: number|null;

    @Column({type:'nvarchar',length:500,nullable:true,name:'ORDER_MODEL'})
    ORDER_MODEL?: string|null;

    @Column({type:'numeric',nullable:true,name:'GEM_TYPE'})
    GEM_TYPE?: number|null;

    @Column({type:'decimal',nullable:true,name:'GEM_WEIGHT'})
    GEM_WEIGHT?: number|null;

    @Column({type:'decimal',nullable:true,name:'SIZE'})
    SIZE?: number|null;

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
