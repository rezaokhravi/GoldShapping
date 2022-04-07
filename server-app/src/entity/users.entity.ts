import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, AfterLoad} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name:"USERS"})
export class UsersEntity {
    @PrimaryGeneratedColumn({type:'numeric',name:'ID'})
    ID?:number;

    @ManyToOne(() => DomainsEntity, domain => domain.USER_DOM_ID_GENDER)
    @Column({ type: "numeric",nullable:true,name:'DOM_ID_GENDER'})
    @JoinColumn({ name: "DOM_ID_GENDER" })
    DOM_ID_GENDER?:number|null;

    @Column({ type: "numeric",nullable:true,name:'DOM_ID_USER_TYPE'})
    @ManyToOne(() => DomainsEntity, domain => domain.USER_DOM_ID_TYPE)
    @JoinColumn({ name: "DOM_ID_USER_TYPE" })
    DOM_ID_USER_TYPE?:number|null;

    @Column({type:'nvarchar',length:100,nullable:true,name:'NAME'})
    NAME?: string|null;

    @Column({type:'nvarchar',length:100,nullable:true,name:'FAMILY'})
    FAMILY?: string|null;

    @Column({type:'nvarchar',length:20,nullable:true,name:'NATIONAL_CODE'})
    NATIONAL_CODE?: string|null;

    @Column({type:'nvarchar',length:20,nullable:true,name:'PHONE'})
    PHONE?: string|null;

    @Column({type:'nvarchar',length:20,nullable:true,name:'MOBILE'})
    MOBILE?: string|null;

    @Column({type:'nvarchar',length:"MAX",nullable:true,name:'IMAGE_USER'})
    IMAGE_USER?: string|null;

    @Column({type:'nvarchar',length:50,nullable:true,name:'USER_NAME'})
    USER_NAME?: string|null;

    @Column({type:'nvarchar',length:50,nullable:true,name:'PASSWORD'})
    PASSWORD?: string|null;

    @Column({type:'nvarchar',length:100,nullable:true,name:'EMAIL'})
    EMAIL?: string|null;

    @Column({type:'nvarchar',length:500,nullable:true,name:'ADDRESS'})
    ADDRESS?: string|null;

    @Column({ type: "numeric",nullable:true,name:'START_DATE_TIME'})
    START_DATE_TIME?: number|null;

    @Column({ type: "numeric",nullable:true,name:'END_DATE_TIME'})
    END_DATE_TIME?: number|null;

    @Column({ type: "bit",default:0,nullable:true,name:'IS_ACTIVE'})
    IS_ACTIVE?: boolean|null;

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

    public FULL_NAME?: string | null;

    @AfterLoad()
    setComputed() {
        this.FULL_NAME = `${this.NAME} ${this.FAMILY}`;
    }
}
