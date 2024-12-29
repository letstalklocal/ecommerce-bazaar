import { useHero } from "@/hooks/use-hero";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import type { InsertHero } from "@db/schema";

type HeroFormData = Omit<InsertHero, "id">;

export default function HeroPage() {
  const { hero, updateHero } = useHero();
  const form = useForm<HeroFormData>({
    defaultValues: {
      title: hero?.title || "",
      subtitle: hero?.subtitle || "",
      imageUrl: hero?.imageUrl || "",
    },
  });

  const onSubmit = async (data: HeroFormData) => {
    try {
      await updateHero.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Hero Banner</h1>
        <p className="text-muted-foreground">
          Configure your homepage hero banner
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Hero Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Hero Title"
                  {...form.register("title", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Hero Subtitle"
                  {...form.register("subtitle")}
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Image URL"
                  {...form.register("imageUrl", { required: true })}
                />
              </div>
              <Button
                type="submit"
                disabled={updateHero.isPending}
                className="w-full"
              >
                {updateHero.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              <img
                src={form.watch("imageUrl") || hero?.imageUrl}
                alt="Hero banner preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {form.watch("title") || hero?.title || "Hero Title"}
                </h2>
                <p className="text-gray-200">
                  {form.watch("subtitle") || hero?.subtitle || "Hero Subtitle"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
