import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { useRoute } from "wouter";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const { data: product, isLoading } = useProduct(params?.id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing ${product.name} for ${formatPrice(
        product.price
      )}.`
    );
    window.open(`https://wa.me/+15551234567?text=${message}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Buy on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
