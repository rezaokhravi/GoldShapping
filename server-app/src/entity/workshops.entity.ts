import {Entity,Column, PrimaryGeneratedColumn} from "typeorm";


@Entity({name:"WORKSHOPS"})
export class WorkshopsEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @Column({type:'nvarchar',length:150,nullable:true,name:'TITLE'})
    TITLE?: string|null;

    @Column({type:'nvarchar',length:150,nullable:true,name:'RESPONSIBLE_NAME'})
    RESPONSIBLE_NAME?: string|null;

    @Column({type:'nvarchar',length:20,nullable:true,name:'PHONE_ONE'})
    PHONE_ONE?: string|null;

    @Column({type:'nvarchar',length:20,nullable:true,name:'PHONE_TOW'})
    PHONE_TOW?: string|null;

    @Column({type:'nvarchar',length:500,nullable:true,name:'ADDRESS'})
    ADDRESS?: string|null;

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
