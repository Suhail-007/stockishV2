import { ORDER_STATUS } from '../../enums/Order.enum';

export type Order = {
  id: number;
  date: string;
  userId: number;
  tenantId: number;
  orderStatus: ORDER_STATUS;
  from: number;
  to: number;
  hasAccepted: false;
  createdAt: string;
  updatedAt: string;
  total: number;
};
