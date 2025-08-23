import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import heroImage from '@/assets/hero-tech.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cutting-edge technology products"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Innovation in Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-text mb-6 animate-fade-in">
            Innovation in
            <br />
            <span className="text-glow">Technology</span>
            <br />
            at Your Fingertips
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Discover the latest cutting-edge electronic products designed to transform your digital experience
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button className="btn-tech group">
              Explore Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-tech-outline">
              Watch Demo
            </Button>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="card-tech text-center group">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">Certified products with warranty</p>
            </div>
            <div className="card-tech text-center group">
              <Cpu className="w-8 h-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Latest Tech</h3>
              <p className="text-muted-foreground text-sm">Cutting-edge specifications</p>
            </div>
            <div className="card-tech text-center group">
              <Zap className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Express shipping worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;