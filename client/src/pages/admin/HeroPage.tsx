import { useState } from "react";
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
import { Loader2, Save, Upload } from "lucide-react";
import type { InsertHero } from "@db/schema";

type HeroFormData = Omit<InsertHero, "id">;

export default function HeroPage() {
  const { hero, updateHero } = useHero();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<HeroFormData>({
    defaultValues: {
      title: hero?.title || "",
      subtitle: hero?.subtitle || "",
      imageUrl: hero?.imageUrl || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Set the form's imageUrl to a temporary preview
      form.setValue("imageUrl", URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: HeroFormData) => {
    try {
      // If there's a selected file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!uploadRes.ok) throw new Error(await uploadRes.text());
        const { imageUrl } = await uploadRes.json();
        data.imageUrl = imageUrl;
      }

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
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Image URL"
                      {...form.register("imageUrl", { required: true })}
                      className="hidden"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {hero?.imageUrl ? "Replace Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>
                {(previewUrl || hero?.imageUrl) && (
                  <div className="mt-2 aspect-[16/9] relative rounded-lg overflow-hidden border">
                    <img
                      src={previewUrl || hero?.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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
                src={previewUrl || form.watch("imageUrl") || hero?.imageUrl}
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