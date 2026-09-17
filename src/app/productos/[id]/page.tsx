import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: Readonly<ProductDetailPageProps>) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded-lg object-cover"
        />

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {product.category} {product.brand ? `· ${product.brand}` : ""}
          </span>

          <h1 className="text-2xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="mt-2">
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
      </div>
    </main>
  );
}
