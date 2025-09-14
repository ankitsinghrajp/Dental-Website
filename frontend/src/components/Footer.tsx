import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your dental tools. Can you help me?");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-foreground text-background py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
             {/* Logo */}
         <div className="flex items-center my-2 space-x-3 cursor-pointer">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">TD</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white/90">Tina Dent</h1>
              <p className="text-xs text-white/60">Believe in Quality</p>
            </div>
          </div>
            <p className="text-sm text-background/80 mb-4">
              Professional dental tools and equipment for modern dentistry. Trusted by over 10,000+ dental professionals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="block hover:text-primary transition-colors">Products</Link>
              <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
              <button 
                onClick={handleWhatsApp}
                className="block hover:text-primary transition-colors text-left"
              >
                WhatsApp Orders
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-background/80">123 Medical District<br />Delhi, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80">+91 7503772789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80">pusharkumar15@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-accent" />
                <button 
                  onClick={handleWhatsApp}
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  WhatsApp: +91 7503772789
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-background/10 hover:bg-background/20 p-2 rounded-lg transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-background/80 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="bg-background/10 hover:bg-background/20 p-2 rounded-lg transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-background/80 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="bg-background/10 hover:bg-background/20 p-2 rounded-lg transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-background/80 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="bg-background/10 hover:bg-background/20 p-2 rounded-lg transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-background/80 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 TinaDent. All rights reserved. Professional dental equipment for modern dentistry.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;