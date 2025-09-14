import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { state, updateQuantity, removeFromCart, clearCart, closeCart, getTotalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const isFormValid = () => {
    return customerInfo.name.trim() && customerInfo.phone.trim() && customerInfo.address.trim();
  };

  // Helper function to get the current price (discounted if available, otherwise regular price)
  const getCurrentPrice = (product) => {
    return product.discounted_price || product.price || 0;
  };

  // Helper function to check if item has a discount
  const hasDiscount = (product) => {
    return product.discounted_price && product.price && product.discounted_price < product.price;
  };

  const generateWhatsAppMessage = () => {
    let message = "Order Details:\n";
    state.items.forEach(item => {
      const currentPrice = getCurrentPrice(item.product);
      message += `- ${item.product.name} x${item.quantity} @ ₹${currentPrice} = ₹${currentPrice * item.quantity}\n`;
    });
    message += `\nTotal = ₹${getTotalPrice()}\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Address: ${customerInfo.address}`;
    
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all customer details.",
        variant: "destructive",
      });
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and form after successful order
    clearCart();
    setCustomerInfo({ name: '', phone: '', address: '' });
    closeCart();
    
    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp.",
    });
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg sm:max-h-[90vh] max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={closeCart}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors text-white hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Shopping Cart</h2>
              <p className="text-blue-100 text-sm">{state.items.length} {state.items.length === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Cart Items */}
              <div className="space-y-3">
                {state.items.map((item) => {
                  const currentPrice = getCurrentPrice(item.product);
                  const itemHasDiscount = hasDiscount(item.product);
                  
                  return (
                    <div key={item.product.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-tight">{item.product.name}</h3>
                          
                          {/* Price Display with Discount */}
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-blue-600 font-semibold text-sm">₹{currentPrice?.toLocaleString() || '0'}</p>
                            {itemHasDiscount && (
                              <>
                                <p className="text-gray-400 line-through text-xs">₹{item.product.price?.toLocaleString()}</p>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                  {Math.round(((item.product.price - item.product.discounted_price) / item.product.price) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-50 active:bg-gray-100"
                              >
                                <Minus className="h-3 w-3 text-gray-600" />
                              </Button>
                              <span className="px-3 py-2 text-sm font-medium border-x border-gray-200 min-w-[2.5rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-50 active:bg-gray-100"
                              >
                                <Plus className="h-3 w-3 text-gray-600" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                ₹{(currentPrice * item.quantity).toLocaleString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-blue-600">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center text-base">
                  Customer Information
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cart-name" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input
                      id="cart-name"
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cart-phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="cart-phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cart-address" className="text-sm font-medium text-gray-700">Delivery Address</Label>
                    <Textarea
                      id="cart-address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {state.items.length > 0 && (
          <div className="bg-white border-t border-gray-200 p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={handleClearCart}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium text-sm h-auto"
              >
                Clear Cart
              </Button>
              <Button 
                onClick={handleCheckout}
                disabled={!isFormValid()}
                className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center space-x-2 h-auto ${
                  isFormValid() 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 active:scale-[0.98] hover:text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200 hover:text-gray-500'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order via WhatsApp</span>
              </Button>
            </div>
            
            {!isFormValid() && state.items.length > 0 && (
              <p className="text-xs text-gray-500 text-center">
                Please fill in all customer details to proceed with your order
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;