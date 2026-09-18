export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface AddToCartInput {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}
