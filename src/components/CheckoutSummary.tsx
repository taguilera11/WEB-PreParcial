"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSummary() {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Tu carrito esta vacio
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Agrega productos desde el catalogo para poder finalizar la compra
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-yellow-700 hover:underline"
        >
      Volver al cataalogo
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">


      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-3 border-b border-gray-100 pb-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-16 w-16 rounded object-cover"
              />

            <div className="flex flex-1 flex-col gap-2">
              <span className="font-medium text-gray-900">{item.title}</span>
              <span className="text-sm text-gray-500">
                ${item.price} c/u
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`Quitar una unidad de ${item.title}`}
                  className="h-7 w-7 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  −
                </button>

                <span className="w-6 text-center text-sm text-gray-900">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => increaseQuantity(item.id)}
                  aria-label={`Agregar una unidad de ${item.title}`}
                  className="h-7 w-7 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-sm text-red-600 hover:underline"
                >
                  eliminar
                </button>
              </div>
            </div>

            <span className="font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Aritculos: {totalItems}
        </span>
        <span className="text-xl font-bold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={clearCart}
        className="mt-4 w-full rounded-md border border-yellow-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Vaciar carrito!!
      </button>
    </section>
  );
}
