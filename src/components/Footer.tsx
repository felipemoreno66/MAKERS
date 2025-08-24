import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/auth');
  };

  return (
    <footer className="bg-secondary/20 border-t border-border/30 py-8">
      <div className="container mx-auto px-4 pr-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <span className="text-xl font-bold text-glow">Makers Tech</span>
          </div>
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Makers Tech. Innovation in Technology at Your Fingertips.
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleAdminClick}
            className="text-sm text-muted-foreground hover:text-primary transition-colors mr-16"
          >
            admin
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;