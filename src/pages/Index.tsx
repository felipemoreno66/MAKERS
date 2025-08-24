import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
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
      1: { name: "HP Computer", price: 500, image: "/placeholder.svg" },
      2: { name: "Dell Computer", price: 650, image: "/placeholder.svg" },
      3: { name: "LG Monitor", price: 150, image: "/placeholder.svg" },
      4: { name: "Logitech Mouse", price: 25, image: "/placeholder.svg" },
      5: { name: "Corsair Keyboard", price: 75, image: "/placeholder.svg" },
      6: { name: "HP Printer", price: 4999, image: "/placeholder.svg" },
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

  console.log('Index component rendering', { totalItems, cartItems });
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={totalItems} />
      
      <main>
        <HeroSection />
        <ProductCatalog onAddToCart={handleAddToCart} />
        <AboutSection />
      </main>

      <Footer />

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
