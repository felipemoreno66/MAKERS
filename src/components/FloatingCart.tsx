import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FloatingCartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

const FloatingCart = ({ items = [], onUpdateQuantity, onRemoveItem }: FloatingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <>
      {/* Cart Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-cart group"
        size="lg"
      >
        <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        <span className="font-medium">{totalItems}</span>
        <div className="ml-2 text-sm opacity-75">
          ${totalPrice.toLocaleString()}
        </div>
      </Button>

      {/* Cart Dropdown */}
      {isOpen && (
        <Card className="fixed top-20 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 bg-card/95 backdrop-blur-lg border-border/50 shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Shopping Cart</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Cart Items */}
            <div className="max-h-64 overflow-y-auto space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => onRemoveItem?.(item.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Items:</span>
                <Badge variant="secondary">{totalItems}</Badge>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-glow">${totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full btn-tech">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full btn-tech-outline">
                  View Full Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FloatingCart;