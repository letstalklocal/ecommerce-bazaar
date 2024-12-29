import { ProductCard } from "./ProductCard";
import type { Product } from "@db/schema";

type ProductGridProps = {
  products: (Product & { category: { name: string } })[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
