export interface NewReview {
  productId: number;
  userId: number;
  headline?: string;
  review: string;
  rating: number;
}