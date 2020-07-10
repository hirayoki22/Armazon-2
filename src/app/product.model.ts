export interface Product {
  productId: number;
  productName: string;
  productDesc: string;
  productImage: string;
  price: number;
  available: boolean;
  totalStock: number;
  quantity?: number;
}