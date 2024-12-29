import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@db/schema";

type ProductCardProps = {
  product: Product & { category: { name: string } };
};

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the WhatsApp button
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing ${product.name} for ${formatPrice(product.price)}.`
    );
    window.open(`https://wa.me/+15551234567?text=${message}`);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <a className="block">
        <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="aspect-square relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{product.category.name}</p>
              <h3 className="font-medium leading-none">{product.name}</h3>
              <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Buy on WhatsApp
            </Button>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}