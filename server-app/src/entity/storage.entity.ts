import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"STORAGE"})
export class StorageEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @ManyToOne(() => DomainsEntity, domain => domain.STORAGE_DOM_ID_TYPE)
    @Column({type: "numeric",nullable:true,name:'DOM_ID_TYPE'})
    @JoinColumn({ name: "DOM_ID_TYPE" })
    DOM_ID_TYPE?: number|null;

    @Column({type:'nvarchar',length:150,nullable:true,name:'TITLE'})
    TITLE?: string|null;

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
