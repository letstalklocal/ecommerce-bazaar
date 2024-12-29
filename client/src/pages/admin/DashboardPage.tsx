import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Grid3x3, ImageIcon, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { products } = useProducts();
  const { categories } = useCategories();

  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const popularProducts = products?.filter((p) => p.isPopular).length || 0;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Products in store",
      icon: Package,
    },
    {
      title: "Categories",
      value: totalCategories,
      description: "Active categories",
      icon: Grid3x3,
    },
    {
      title: "Popular Products",
      value: popularProducts,
      description: "Featured items",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your store admin dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Latest products added to store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${(product.price / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Overview</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories?.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">
                    {products?.filter((p) => p.categoryId === category.id).length}{" "}
                    products
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
