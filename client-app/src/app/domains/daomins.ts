import {IConfig} from "ngx-mask";


export enum enExchangeType {
  purchase = 16,
  sale = 17,
  advice = 18,
  change = 19,
  deliver = 34,
  receive = 35
}

export enum enOrderType {
  deliver = 13,
  receive = 14
}

export enum enGoldType {
  waterGold = 25,
  buildGold = 26,
  oldGold = 27,
  accountGold = 54,
}

export enum enAccountType {
  exchange = 37,
  wholesaler = 38,
  workshop = 39
}

export enum enTransferType {
  receive = 50,
  payment = 51
}


export const maskConfig: Partial<IConfig> = {
  validation: false,
}

export const ICONS = [
  {label: 'bi bi-box-seam', value: 'bi bi-box-seam'},
  {label: 'bi bi-box-arrow-up-right', value: 'bi bi-box-arrow-up-right'},
  {label: 'bi bi-box-arrow-up-left', value: 'bi bi-box-arrow-up-left'},
  {label: 'bi bi-box-arrow-up', value: 'bi bi-box-arrow-up'},
  {label: 'bi bi-card-list', value: 'bi bi-card-list'},
  {label: 'bi bi-caret-left-fill', value: 'bi bi-caret-left-fill'},
  {label: 'bi bi-caret-left', value: 'bi bi-caret-left'},
  {label: 'bi bi-arrow-clockwise', value: 'bi bi-arrow-clockwise'},
  {label: 'bi bi-arrow-counterclockwise', value: 'bi bi-arrow-counterclockwise'},
  {label: 'bi bi-arrow-repeat', value: 'bi bi-arrow-repeat'},
  {label: 'bi bi-search', value: 'bi bi-search'},
  {label: 'bi bi-server', value: 'bi bi-server'},
  {label: 'bi bi-pin-map', value: 'bi bi-pin-map'},
  {label: 'bi bi-pin-map-fill', value: 'bi bi-pin-map-fill'},
  {label: 'bi bi-person-square', value: 'bi bi-person-square'},
  {label: 'bi bi-person-bounding-box', value: 'bi bi-person-bounding-box'},
  {label: 'bi bi-people-fill', value: 'bi bi-people-fill'},
  {label: 'bi bi-house-fill', value: 'bi bi-house-fill'},
  {label: 'bi bi-file-person-fill', value: 'bi bi-file-person-fill'},
  {label: 'bi bi-shop', value: 'bi bi-shop'},
  {label: 'bi bi-inboxes-fill', value: 'bi bi-inboxes-fill'},
  {label: 'bi bi-box-seam', value: 'bi bi-box-seam'},
  {label: 'bi bi-arrow-repeat', value: 'bi bi-arrow-repeat'},
  {label: 'bi bi-menu-app', value: 'bi bi-menu-app'},
  {label: 'bi bi-file-text', value: 'bi bi-file-text'},
  {label: 'bi bi-file-text-fill', value: 'bi bi-file-text-fill'},
  {label: 'bi bi-layers-half', value: 'bi bi-layers-half'},
]

export const DatePickerConfig = {
  firstDayOfWeek: 'sa',
  weekDayFormat: 'dd',
  dayBtnFormat: 'DD',
  monthBtnFormat: 'MMMM',
  format: 'jYYYY/jMM/jDD',
  disableKeypress: false,
  locale: 'fa',
  returnedValueType: 'string',
  drops: 'down',
  opens: 'left',
  appendTo: ''
}
