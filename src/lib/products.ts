import { Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE_URL}?limit=8&select=id,title,price,category,thumbnail,stock`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener el catálogo: ${res.status}`);
  }

  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Error al obtener el producto ${id}: ${res.status}`);
  }

  return res.json();
}
