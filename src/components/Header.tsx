"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ShopHub
        </Link>

        <Link
          href="/checkout"
          aria-label={`${totalItems} productos en el carrito`}
          className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white"
        >
          Carrito: {totalItems}
        </Link>
      </div>
    </header>
  );
}
