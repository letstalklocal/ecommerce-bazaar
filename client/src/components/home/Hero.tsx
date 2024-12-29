import type { Hero } from "@db/schema";

type HeroProps = {
  hero: Hero;
};

export function Hero({ hero }: HeroProps) {
  return (
    <div className="relative h-[500px] bg-gray-900">
      <img
        src={hero.imageUrl}
        alt={hero.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          {hero.subtitle && (
            <p className="text-xl md:text-2xl text-gray-200">
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
