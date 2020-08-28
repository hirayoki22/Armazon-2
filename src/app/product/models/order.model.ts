import { BagItem } from '../models/shopping-bag-item.model';

export interface Order {
  userId: number;
  items: BagItem[];
  total: number;
}