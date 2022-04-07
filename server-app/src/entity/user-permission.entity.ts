import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name: "USER_PERMISSION"})
export class UserPermissionEntity {
    @PrimaryGeneratedColumn({type: 'numeric', name: 'ID'})
    ID?: number;

    @Column({type: "numeric", nullable: true, name: 'USE_ID'})
    USE_ID?: number | null;

    @Column({type: 'numeric', nullable: true, name: 'MENU_ID'})
    MENU_ID?: number | null;

    @Column({type: 'bit',default:0, nullable: true, name: 'CAN_SELECT'})
    CAN_SELECT?: boolean | null;

    @Column({type: 'bit',default:0, nullable: true, name: 'CAN_INSERT'})
    CAN_INSERT?: boolean | null;

    @Column({type: 'bit',default:0, nullable: true, name: 'CAN_UPDATE'})
    CAN_UPDATE?: boolean | null;

    @Column({type: 'bit',default:0, nullable: true, name: 'CAN_DELETE'})
    CAN_DELETE?: boolean | null;

    @Column({ type: "nvarchar", length: 20,nullable:true,name:'START_DATE_TIME'})
    START_DATE_TIME?: string|null;

    @Column({ type: "nvarchar", length: 20,nullable:true,name:'END_DATE_TIME'})
    END_DATE_TIME?: string|null;

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

}
