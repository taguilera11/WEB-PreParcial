import { CartItem } from "@/types/cart";
import { OrderResponse } from "@/types/checkout";

const ORDERS_URL = "https://dummyjson.com/carts/add";

export async function createOrder(items: CartItem[]): Promise<OrderResponse> {
  const res = await fetch(ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  if (!res.ok) {
    throw new Error(`Error al crear la orden :(`);
  }

  return res.json();
}
