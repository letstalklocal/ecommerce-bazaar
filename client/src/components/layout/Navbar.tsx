import { Link } from "wouter";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold">Shop Name</a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a className="text-sm font-medium hover:text-primary transition-colors">
                  {label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {NAV_ITEMS.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    <a
                      className="text-lg font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}