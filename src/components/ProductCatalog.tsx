import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Filter } from 'lucide-react';

// Mock data - in real app this would come from Supabase
const mockProducts = [
  {
    id: 1,
    name: "HP Computer",
    category: "Computers",
    price: 500,
    rating: 4.9,
    image: "/placeholder.svg",
    description: "15.6-inch Screen, 8GB RAM, 1TB SSD",
    inStock: true,
    featured: false
  },
  {
    id: 2,
    name: "Dell Computer",
    category: "Computers",
    price: 650,
    rating: 4.8,
    image: "/placeholder.svg",
    description: "14-inch Screen, 16GB RAM, 512GB SSD",
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "LG Monitor",
    category: "Monitors",
    price: 150,
    rating: 4.7,
    image: "/placeholder.svg",
    description: "24-inch Screen, 1080p Resolution, IPS Panel",
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "HP Printer",
    category: "Printers",
    price: 120,
    rating: 4.9,
    image: "/placeholder.svg",
    description: "Laser Printer, WiFi, Monochrome",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Razer Mouse",
    category: "Gaming",
    price: 40,
    rating: 4.6,
    image: "/placeholder.svg",
    description: "Wireless, 16,000 DPI Sensor, 7 Programmable Buttons",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Lenovo Laptop",
    category: "Laptops",
    price: 650,
    rating: 4.8,
    image: "/placeholder.svg",
    description: "8GB RAM, 1TB HDD, 15.6-inch Screen",
    inStock: true,
    featured: false
  }
];

const categories = ["All", "Laptops", "Computers", "Gaming", "Monitors", "Printers"];

interface ProductCatalogProps {
  onAddToCart?: (productId: number) => void;
}

const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = mockProducts.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <section id="products" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow mb-6">
            Product Catalog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of cutting-edge electronic products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-tech" : "btn-tech-outline"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="card-product group">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="text-2xl font-bold text-glow">
                  ${product.price.toLocaleString()}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full btn-tech group"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart?.(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;