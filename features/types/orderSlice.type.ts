import { Order } from '../../apis/types/order.type';

export type OrderD = Order & {
  profit: number;
  total: number;
};
