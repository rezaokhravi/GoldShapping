import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, AfterLoad} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name: "CUSTOMERS"})
export class CustomersEntity {
    @PrimaryGeneratedColumn({type: 'numeric', name: 'ID'})
    ID?: number;

    @ManyToOne(() => DomainsEntity, domain => domain.CUSTOMER_DOM_ID_GENDER)
    @Column({type: "numeric", nullable: true, name: 'DOM_ID_GENDER'})
    @JoinColumn({name: "DOM_ID_GENDER"})
    DOM_ID_GENDER?: number | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'CODE'})
    CODE?: string | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'NAME'})
    NAME?: string | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'FAMILY'})
    FAMILY?: string | null;

    @Column({type: 'nvarchar', length: 50, nullable: true, name: 'NATIONAL_CODE'})
    NATIONAL_CODE?: string | null;

    @Column({type: 'nvarchar', length: 50, nullable: true, name: 'PHONE'})
    PHONE?: string | null;

    @Column({type: 'nvarchar', length: 50, nullable: true, name: 'MOBILE'})
    MOBILE?: string | null;

    @Column({type: 'nvarchar', length: 500, nullable: true, name: 'ADDRESS'})
    ADDRESS?: string | null;

    @Column({type: 'nvarchar', length: 200, nullable: true, name: 'JOB_TITLE'})
    JOB_TITLE?: string | null;

    @Column({type: 'nvarchar', length: 500, nullable: true, name: 'DESCRIPTION'})
    DESCRIPTION?: string | null;

    @Column({type: "numeric", nullable: true, name: 'USE_ID_CREATOR'})
    USE_ID_CREATOR?: number | null;

    @Column({type: "numeric", nullable: true, name: 'CREATE_DATE_TIME'})
    CREATE_DATE_TIME?: number | null;

    @Column({type: "numeric", nullable: true, name: 'MODIFY_USE_ID'})
    MODIFY_USE_ID?: number | null;

    @Column({type: "numeric", nullable: true, name: 'MODIFY_DATE_TIME'})
    MODIFY_DATE_TIME?: number | null;

    
    public FULL_NAME?: string | null;

    public FULL_TITLE?: string | null;

    @AfterLoad()
    setComputed() {
        this.FULL_NAME = `${this.NAME} ${this.FAMILY}`;
        this.FULL_TITLE = `${this.NATIONAL_CODE} - ${this.NAME} ${this.FAMILY} - ${this.MOBILE}`;
    }

}
