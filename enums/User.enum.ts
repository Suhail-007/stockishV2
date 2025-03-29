export enum USER_STATUS {
  inactive = '0',
  active = '1'
}

export enum USER_ROLE {
  admin = '0',
  moderator = '1',
  employee = '2',
  doctor = '3'
}

export enum PRICE_ASSIGN_TYPE {
  none = '0', // only for admin
  fixed = '1',
  perUser = '2'
}
