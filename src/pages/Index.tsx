import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import FloatingCart from '@/components/FloatingCart';
import ChatBot from '@/components/ChatBot';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: number) => {
    // Mock product data - in real app this would come from Supabase
    const products = {
      1: { name: "MakerBook Pro 16", price: 2499, image: "/placeholder.svg" },
      2: { name: "TechPods Max", price: 549, image: "/placeholder.svg" },
      3: { name: "SmartWatch Ultra", price: 799, image: "/placeholder.svg" },
      4: { name: "Gaming Beast RTX", price: 3299, image: "/placeholder.svg" },
      5: { name: "Studio Display 5K", price: 1599, image: "/placeholder.svg" },
      6: { name: "Camera Pro Max", price: 4999, image: "/placeholder.svg" },
    };

    const product = products[productId as keyof typeof products];
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: productId,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={totalItems} />
      
      <main>
        <HeroSection />
        <ProductCatalog onAddToCart={handleAddToCart} />
      </main>

      <FloatingCart 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      <ChatBot />
    </div>
  );
};

export default Index;
