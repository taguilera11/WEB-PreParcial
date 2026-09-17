import Link from "next/link";
import { ProductListItem } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link href={`/productos/${product.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </span>

        <Link href={`/productos/${product.id}`} className="hover:underline">
          <h2 className="font-semibold text-gray-900">{product.title}</h2>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <div className="mt-3">
          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
            }}
          />
        </div>
      </div>
    </article>
  );
}
