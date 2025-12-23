interface Product {
  id: string;
  title: string;
  price?: number;
  categories?: Array<{ title: string }>;
  images?: Array<{ url: string; name?: string }>;
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `http://localhost:8080/api/products?search=${encodeURIComponent(query)}&limit=8`
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}