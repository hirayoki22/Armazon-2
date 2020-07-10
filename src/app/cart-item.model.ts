export interface CartItem {
  productId: number;
  productName: string;
  productImage: string;
  available: boolean;
  totalStock: number;
  price: number;
  quantity: number;
  subtotal: number;
}