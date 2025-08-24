import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface ProductSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  stockFilter: string;
  onStockFilterChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
}

const ProductSearchFilter = ({
  searchTerm,
  onSearchChange,
  stockFilter,
  onStockFilterChange,
  priceFilter,
  onPriceFilterChange
}: ProductSearchFilterProps) => {
  return (
    <Card className="card-tech">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
          
          <Select value={stockFilter} onValueChange={onStockFilterChange}>
            <SelectTrigger className="bg-background border-border focus:border-primary">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by stock" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock Levels</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock (≤10)</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={onPriceFilterChange}>
            <SelectTrigger className="bg-background border-border focus:border-primary">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by price" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-50">Under $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-500">$100 - $500</SelectItem>
              <SelectItem value="over-500">Over $500</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground flex items-center">
            <span>Use filters to refine your search</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearchFilter;