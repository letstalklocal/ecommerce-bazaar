import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Loader2 } from "lucide-react";
import type { Category } from "@db/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:id");

  const { data: category, isLoading } = useQuery<
    Category & { products: any[] }
  >({
    queryKey: [`/api/categories/${params?.id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mt-2">{category.description}</p>
        )}
      </div>

      {category.products.length > 0 ? (
        <ProductGrid products={category.products} />
      ) : (
        <p>No products found in this category</p>
      )}
    </div>
  );
}
