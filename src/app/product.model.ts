export interface Product {
  productId?: number;
  productName: string;
  brand: string;
  productDesc: string;
  productImage?: string;
  price: number;
  available?: boolean;
  totalStock: number;
  categoryId: number;
  images?: [];
  hasVariant: boolean;
}