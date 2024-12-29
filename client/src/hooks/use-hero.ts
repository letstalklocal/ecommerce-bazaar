import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Hero, InsertHero } from "@db/schema";
import { useToast } from "@/hooks/use-toast";

export function useHero() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: hero, isLoading } = useQuery<Hero>({
    queryKey: ["/api/hero"],
  });

  const updateHero = useMutation({
    mutationFn: async (data: InsertHero) => {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero"] });
      toast({ title: "Hero banner updated successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating hero banner",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    hero,
    isLoading,
    updateHero,
  };
}
