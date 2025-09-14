import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, Mail } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCart();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (section: string) => {
    setIsOpen(false);
    // Add any navigation logic here
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/10' 
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">TD</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Tina Dent
                </h1>
                <p className="text-xs text-gray-600 font-medium">Believe in Quality</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative font-semibold transition-all duration-200 py-2 px-3 rounded-lg ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Contact Info */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 border-r border-gray-200 pr-4">
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span className="font-medium">7503772789</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span className="font-medium">pusharkumar15@gmail.com</span>
                </div>
              </div>
              
              {/* Cart Button */}
              <Button
                onClick={toggleCart}
                className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full border-2 border-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Cart Button */}
              <Button
                onClick={toggleCart}
                variant="outline"
                size="sm"
                className="relative border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center p-0 rounded-full border border-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                size="sm"
                className="border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-500"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Navigation Links */}
            <div className="px-4 py-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50 border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Contact Section */}
            <div className="px-4 py-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">7503772789, 7503772012</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-600">pusharkumar15@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA Section */}
            <div className="px-4 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="text-center">
                <h3 className="text-white font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Contact our dental equipment specialists
                </p>
                <Link to="/contact">
                  <Button 
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;