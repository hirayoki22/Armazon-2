import { CartItem } from './cart-item.model';

export interface Order {
  userId: number;
  items: CartItem[];
  total: number;
}