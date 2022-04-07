import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {DomainsEntity} from "./domains.entity";


@Entity({name: "MENUS"})
export class MenuEntity {
    @PrimaryGeneratedColumn({type: 'numeric', name: 'ID'})
    ID?: number;

    @Column({type: 'numeric', nullable: true, name: 'MENU_ID'})
    MENU_ID?: number | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'TITLE'})
    TITLE?: string | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'NAME'})
    NAME?: string | null;

    @Column({type: 'nvarchar', length: 200, nullable: true, name: 'ROUTE'})
    ROUTE?: string | null;

    @Column({type: 'nvarchar', length: 100, nullable: true, name: 'ICON'})
    ICON?: string | null;

    @Column({type: 'int', nullable: true, name: 'ORDERING'})
    ORDERING?: number | null;

    @Column({type: 'bit',default:0, nullable: true, name: 'IS_ROUTER_ACTIVE'})
    IS_ROUTER_ACTIVE?: boolean| null;

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
