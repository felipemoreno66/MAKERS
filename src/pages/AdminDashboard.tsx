import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import AdminMetricsCard from '@/components/AdminMetricsCard';
import ProductSearchFilter from '@/components/ProductSearchFilter';
import ProductChart from '@/components/ProductChart';
import ProductGrid from '@/components/ProductGrid';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
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

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.id.toString().includes(searchTerm) ||
                           (product.descriptión && product.descriptión.toLowerCase().includes(searchTerm.toLowerCase()));

      // Stock filter
      let matchesStock = true;
      const stock = product.stock || 0;
      switch (stockFilter) {
        case 'in-stock':
          matchesStock = stock > 10;
          break;
        case 'low-stock':
          matchesStock = stock > 0 && stock <= 10;
          break;
        case 'out-of-stock':
          matchesStock = stock === 0;
          break;
        default:
          matchesStock = true;
      }

      // Price filter
      let matchesPrice = true;
      const price = product.price || 0;
      switch (priceFilter) {
        case 'under-50':
          matchesPrice = price < 50;
          break;
        case '50-100':
          matchesPrice = price >= 50 && price <= 100;
          break;
        case '100-500':
          matchesPrice = price > 100 && price <= 500;
          break;
        case 'over-500':
          matchesPrice = price > 500;
          break;
        default:
          matchesPrice = true;
      }

      return matchesSearch && matchesStock && matchesPrice;
    });
  }, [products, searchTerm, stockFilter, priceFilter]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
    const totalValue = products.reduce((sum, product) => sum + ((product.price || 0) * (product.stock || 0)), 0);
    const lowStockProducts = products.filter(product => (product.stock || 0) <= 10 && (product.stock || 0) > 0).length;

    return { totalProducts, totalStock, totalValue, lowStockProducts };
  }, [products]);

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
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">MT</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-glow">Admin Dashboard</h1>
              <p className="text-muted-foreground">Complete inventory overview and management</p>
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

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminMetricsCard
            title="Total Products"
            value={metrics.totalProducts}
            icon={<Package className="w-5 h-5" />}
            trend="up"
            trendValue="+12%"
          />
          <AdminMetricsCard
            title="Total Stock"
            value={`${metrics.totalStock.toLocaleString()} units`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            trendValue="+8%"
          />
          <AdminMetricsCard
            title="Total Value"
            value={`$${metrics.totalValue.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            trendValue="+15%"
          />
          <AdminMetricsCard
            title="Low Stock Alerts"
            value={metrics.lowStockProducts}
            icon={<AlertTriangle className="w-5 h-5" />}
            trend="down"
            trendValue="-3%"
          />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <ProductChart products={products} />
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <ProductSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <Card className="card-tech">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} of {products.length} products
                  </span>
                  {(searchTerm || stockFilter !== 'all' || priceFilter !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setStockFilter('all');
                        setPriceFilter('all');
                      }}
                      className="text-xs text-primary hover:text-primary-foreground hover:bg-primary"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Grid */}
        <ProductGrid 
          products={filteredProducts}
          onProductSelect={setSelectedProduct}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;