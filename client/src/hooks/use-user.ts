import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, InsertUser } from "@db/schema";
import { useToast } from "@/hooks/use-toast";

export function useUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: Infinity,
    initialData: null
  });

  const login = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Logged in successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error logging in",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({ title: "Logged out successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    user,
    isLoading,
    login,
    logout,
  };
}