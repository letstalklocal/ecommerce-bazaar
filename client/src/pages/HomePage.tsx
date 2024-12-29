import { useHero } from "@/hooks/use-hero";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { hero, isLoading: isLoadingHero } = useHero();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { products, isLoading: isLoadingProducts } = useProducts();

  const popularProducts = products?.filter((p) => p.isPopular) || [];

  if (isLoadingHero || isLoadingCategories || isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {hero && <Hero hero={hero} />}

      <div className="container mx-auto px-4 space-y-16 my-16">
        <section>
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          {categories && <CategoryGrid categories={categories.slice(0, 4)} />}
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Popular Products</h2>
          {popularProducts.length > 0 ? (
            <ProductGrid products={popularProducts} />
          ) : (
            <p>No popular products found</p>
          )}
        </section>
      </div>
    </div>
  );
}
