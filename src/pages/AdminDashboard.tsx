import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, LogOut } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  descriptión: string | null;
  price: number | null;
  stock: number | null;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('PRODUCT')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        toast({
          title: "Error fetching products",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">MT</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-glow">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your products</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="card-tech">
          <CardHeader>
            <CardTitle className="text-foreground">Products</CardTitle>
            <CardDescription className="text-muted-foreground">
              All products in your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products found in the database</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">ID</TableHead>
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Description</TableHead>
                    <TableHead className="text-foreground">Price</TableHead>
                    <TableHead className="text-foreground">Stock</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="text-foreground font-medium">{product.id}</TableCell>
                      <TableCell className="text-foreground">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.descriptión ? 
                          (product.descriptión.length > 50 ? 
                            `${product.descriptión.substring(0, 50)}...` : 
                            product.descriptión
                          ) : 
                          'No description'
                        }
                      </TableCell>
                      <TableCell className="text-foreground">
                        {product.price ? `$${product.price.toFixed(2)}` : 'N/A'}
                      </TableCell>
                      <TableCell className="text-foreground">{product.stock || 0}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                              className="text-primary hover:text-primary-foreground hover:bg-primary"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="card-tech max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-foreground">Product Details</DialogTitle>
                              <DialogDescription className="text-muted-foreground">
                                Complete information about this product
                              </DialogDescription>
                            </DialogHeader>
                            {selectedProduct && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-foreground">Product ID</h4>
                                  <p className="text-muted-foreground">{selectedProduct.id}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">Name</h4>
                                  <p className="text-muted-foreground">{selectedProduct.name}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">Description</h4>
                                  <p className="text-muted-foreground">
                                    {selectedProduct.descriptión || 'No description available'}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">Price</h4>
                                  <p className="text-muted-foreground">
                                    {selectedProduct.price ? `$${selectedProduct.price.toFixed(2)}` : 'Price not set'}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">Stock</h4>
                                  <p className="text-muted-foreground">
                                    {selectedProduct.stock !== null ? `${selectedProduct.stock} units` : 'Stock not set'}
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;