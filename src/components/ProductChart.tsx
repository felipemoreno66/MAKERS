import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Product {
  id: number;
  name: string;
  descriptión: string | null;
  price: number | null;
  stock: number | null;
}

interface ProductChartProps {
  products: Product[];
}

const ProductChart = ({ products }: ProductChartProps) => {
  // Prepare data for stock levels chart
  const stockData = products.map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    stock: product.stock || 0,
    price: product.price || 0
  })).slice(0, 10); // Limit to top 10 for readability

  // Prepare data for stock status pie chart
  const stockStatusData = [
    {
      name: 'In Stock',
      value: products.filter(p => (p.stock || 0) > 10).length,
      color: 'hsl(var(--accent))'
    },
    {
      name: 'Low Stock',
      value: products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length,
      color: 'hsl(var(--primary))'
    },
    {
      name: 'Out of Stock',
      value: products.filter(p => (p.stock || 0) === 0).length,
      color: 'hsl(var(--destructive))'
    }
  ];

  const chartConfig = {
    stock: {
      label: "Stock",
      color: "hsl(var(--primary))",
    },
    price: {
      label: "Price",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-tech">
        <CardHeader>
          <CardTitle className="text-foreground">Stock Levels</CardTitle>
          <CardDescription className="text-muted-foreground">
            Current inventory levels by product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="stock" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="card-tech">
        <CardHeader>
          <CardTitle className="text-foreground">Stock Status Distribution</CardTitle>
          <CardDescription className="text-muted-foreground">
            Overview of product availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductChart;