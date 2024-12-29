import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>123 Shopping Street</p>
              <p>Retail City, RC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@shopname.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="/" className="block hover:underline">
                Home
              </a>
              <a href="/about" className="block hover:underline">
                About Us
              </a>
              <a href="/categories" className="block hover:underline">
                Categories
              </a>
              <a href="/contact" className="block hover:underline">
                Contact
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="text-center text-sm text-primary-foreground/70">
          <p>&copy; 2024 Shop Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
