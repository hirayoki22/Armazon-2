export interface Cart {
  items: {
    productName: string,
    productImage: string,
    available: boolean,
    totalStock: number,
    price: number,
    quantity: number,
    subtotal: number
  }[];
}