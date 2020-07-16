export interface Product {
  productId?: number;
  productName: string;
  brand: string;
  productDesc: string;
  price: number;
  available?: boolean;
  totalStock: number;
  categoryId: number;
  images?: { productId: number, imageUrl: string, order: number }[];
  hasVariant: boolean;
}