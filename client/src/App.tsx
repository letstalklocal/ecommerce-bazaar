import { Switch, Route, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminLayout } from "@/components/layout/AdminLayout";
import HomePage from "@/pages/HomePage";
import ProductPage from "@/pages/ProductPage";
import CategoryPage from "@/pages/CategoryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import HeroPage from "./pages/admin/HeroPage";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function App() {
  const { user, isLoading } = useUser();
  const [location, setLocation] = useLocation();

  // Handle admin route protection
  useEffect(() => {
    if (!isLoading) {
      if (location.startsWith("/admin")) {
        if (!user && location !== "/admin/login") {
          setLocation("/admin/login");
        } else if (user && location === "/admin/login") {
          setLocation("/admin");
        }
      }
    }
  }, [user, isLoading, location, setLocation]);

  // Only show loading during initial authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Admin routes
  if (location.startsWith("/admin")) {
    if (location === "/admin/login") {
      return <LoginPage />;
    }

    if (!user) {
      return null; // Let the useEffect handle the redirect
    }

    return (
      <AdminLayout>
        <Switch>
          <Route path="/admin" component={DashboardPage} />
          <Route path="/admin/products" component={ProductsPage} />
          <Route path="/admin/categories" component={CategoriesPage} />
          <Route path="/admin/hero" component={HeroPage} />
        </Switch>
      </AdminLayout>
    );
  }

  // Public routes
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/category/:id" component={CategoryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;