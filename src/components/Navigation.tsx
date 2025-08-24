import React from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  cartCount?: number;
}

const Navigation = ({ cartCount = 0 }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <h1 className="text-xl font-bold text-glow">Makers Tech</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <Input 
                placeholder="Search products..." 
                className="w-64 bg-secondary/50 border-border/50 focus:border-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;