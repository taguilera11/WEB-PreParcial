export interface CheckoutFormValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  acceptsTerms: boolean;
}

export interface OrderResponse {
  id: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
}
