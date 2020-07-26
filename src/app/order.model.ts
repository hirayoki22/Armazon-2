import { CartItem } from './cart/cart-item.model';

export interface Order {
  userId: number;
  items: CartItem[];
  total: number;
}