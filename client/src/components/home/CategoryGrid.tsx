import { Link } from "wouter";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { Category } from "@db/schema";

type CategoryGridProps = {
  categories: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <a className="block">
            <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-200 mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  );
}
