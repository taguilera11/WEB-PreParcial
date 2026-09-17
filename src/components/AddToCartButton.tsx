"use client";

import { useCart } from "@/context/CartContext";
import { AddToCartInput } from "@/types/cart";

interface AddToCartButtonProps {
  product: AddToCartInput;
}

export default function AddToCartButton({
  product,
}: Readonly<AddToCartButtonProps>) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      Agregar al carrito
    </button>
  );
}
