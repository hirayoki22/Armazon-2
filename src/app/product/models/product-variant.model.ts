export interface ProductVariant {
  variantId: number;
  option: string;
  optionValue: string;
  available: boolean;
  price: number;
  iconUrl?: string;
}