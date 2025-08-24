import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

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
      color: 'hsl(142 71% 45%)',
      fill: 'hsl(142 71% 45%)'
    },
    {
      name: 'Low Stock',
      value: products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length,
      color: 'hsl(217 91% 60%)',
      fill: 'hsl(217 91% 60%)'
    },
    {
      name: 'Out of Stock',
      value: products.filter(p => (p.stock || 0) === 0).length,
      color: 'hsl(0 84.2% 60.2%)',
      fill: 'hsl(0 84.2% 60.2%)'
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
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-foreground font-medium">{data.payload.name}</p>
                          <p className="text-primary">{data.value} products</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={60}
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value, entry) => (
                    <span style={{ color: 'hsl(var(--foreground))' }}>
                      {value}: {entry.payload.value} products
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductChart;