
export interface IUserPermission {
    ID?: number,
    USE_ID?: number,
    MENU_ID?: number,
    CAN_SELECT?: boolean,
    CAN_INSERT?: boolean,
    CAN_UPDATE?: boolean,
    CAN_DELETE?: boolean,
    START_DATE_TIME?: string,
    END_DATE_TIME?: string,
    DESCRIPTION?: string,
    USE_ID_CREATOR?: number,
    CREATE_DATE_TIME?: number,
    MODIFY_USE_ID?: number,
    MODIFY_DATE_TIME?: number,
}
