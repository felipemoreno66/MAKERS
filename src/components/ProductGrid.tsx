import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  descriptión: string | null;
  price: number | null;
  stock: number | null;
}

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductGrid = ({ products, onProductSelect }: ProductGridProps) => {
  const getStockStatus = (stock: number | null) => {
    if (!stock || stock === 0) return { status: 'out', icon: XCircle, color: 'destructive' };
    if (stock <= 10) return { status: 'low', icon: AlertTriangle, color: 'warning' };
    return { status: 'good', icon: CheckCircle, color: 'success' };
  };

  const getStockBadge = (stock: number | null) => {
    const { status, icon: Icon, color } = getStockStatus(stock);
    const stockValue = stock || 0;
    
    if (status === 'out') {
      return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" />Out of Stock</Badge>;
    }
    if (status === 'low') {
      return <Badge variant="secondary" className="flex items-center gap-1 bg-orange-500/20 text-orange-400 border-orange-500/30"><AlertTriangle className="w-3 h-3" />Low Stock</Badge>;
    }
    return <Badge variant="secondary" className="flex items-center gap-1 bg-accent/20 text-accent border-accent/30"><CheckCircle className="w-3 h-3" />In Stock</Badge>;
  };

  if (products.length === 0) {
    return (
      <Card className="card-tech">
        <CardContent className="p-12 text-center">
          <div className="text-muted-foreground">
            <XCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="card-product group cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  ID: {product.id}
                </CardDescription>
              </div>
              <div className="ml-2">
                {getStockBadge(product.stock)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.descriptión || 'No description available'}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {product.price ? `$${product.price.toFixed(2)}` : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stock: {product.stock || 0} units
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onProductSelect(product)}
                      className="text-primary hover:text-primary-foreground hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="card-tech max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">{product.name}</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Product ID: {product.id}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Description</h4>
                        <p className="text-muted-foreground">
                          {product.descriptión || 'No description available'}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Price</h4>
                          <p className="text-xl font-bold text-primary">
                            {product.price ? `$${product.price.toFixed(2)}` : 'Price not set'}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Stock</h4>
                          <div className="space-y-1">
                            <p className="text-xl font-bold text-foreground">
                              {product.stock !== null ? `${product.stock}` : '0'} units
                            </p>
                            {getStockBadge(product.stock)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;