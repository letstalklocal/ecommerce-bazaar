import { Link } from "wouter";
import { useUser } from "@/hooks/use-user";
import {
  LayoutDashboard,
  Package,
  Grid3x3,
  ImageIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Grid3x3, label: "Categories" },
  { href: "/admin/hero", icon: ImageIcon, label: "Hero Banner" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useUser();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
