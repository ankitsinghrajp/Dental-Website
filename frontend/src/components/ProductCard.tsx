import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, Star,  X, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Image states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  // Quantity states
  const [quantity, setQuantity] = useState(0);
  const [modalQuantity, setModalQuantity] = useState(0);
  
  // UI states
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Cart context
  const { addToCart } = useCart();

  // Auto carousel for main card (only first 2 images)
  useEffect(() => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % Math.min(2, product.images.length));
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [product.images.length]);

  // Modal image navigation
  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Card quantity controls
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  // Modal quantity controls
  const incrementModalQuantity = () => {
    setModalQuantity(prev => prev + 1);
  };

  const decrementModalQuantity = () => {
    setModalQuantity(prev => Math.max(0, prev - 1));
  };

  // Cart actions
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  const handleModalAddToCart = () => {
    if (modalQuantity > 0) {
      addToCart(product, modalQuantity);
      setIsModalOpen(false);
      setModalQuantity(0);
    }
  };

  // Other actions
  const handleFavoriteToggle = () => {
    setIsFavorite(prev => !prev);
  };

  const handleImageClick = () => {
    setModalImageIndex(currentImageIndex);
    setIsModalOpen(true);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalImageIndex(currentImageIndex);
    setIsModalOpen(true);
  };

  // Mock rating and reviews data
  const rating = 4.5;
  const reviewCount = 127;
  
  // Use real prices from product data
  const originalPrice = product.original_price || product.price;
  const discountedPrice = product.discounted_price || product.price;
  const hasDiscount = originalPrice > discountedPrice;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;

  // Get only first 2 images for main card
  const mainCardImages = product.images.slice(0, 2);

  return (
    <>
      {/* Product Card */}
      <Card 
        className="group h-full border-0 shadow-md shadow-gray-800/20 hover:shadow-xl hover:shadow-gray-800/30 transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image Section */}
          <div 
            className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer group/image"
            onClick={handleImageClick}
          >
            <img
              src={mainCardImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Click to view indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                Click to view details
              </div>
            </div>
            
            {/* Top Actions */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md text-xs font-semibold px-2 py-1 w-fit">
                  {product.category}
                </Badge>
                {hasDiscount && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md text-xs font-semibold px-2 py-1 w-fit">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Image Indicators - Only show if more than 1 image in main card */}
            {mainCardImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {mainCardImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-md scale-110' 
                        : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            {/* Product Title & Description */}
            <div className="mb-3">
              <h3 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : i < rating
                        ? 'fill-yellow-400/50 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500">
                  +{product.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{discountedPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
             
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  onClick={incrementQuantity}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 font-semibold py-2.5 text-sm sm:text-base"
                >
                  <Plus className="h-4 text-white w-4 mr-2" />
                  Add to Cart
                </Button>
              ) : (
                <div className="space-y-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      className="h-8 w-8 p-0 border-2 border-gray-300 hover:border-blue-500  hover:bg-blue-50 rounded-full"
                    >
                      <Minus className="h-3.5 text-gray-900 w-3.5" />
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-600">Qty:</span>
                      <span className="font-bold text-base sm:text-lg text-blue-600 min-w-[24px] text-center">
                        {quantity}
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      className="h-8 w-8 p-0 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Plus className="h-3.5 text-gray-900 w-3.5" />
                    </Button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-200 font-semibold py-2.5 text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add {quantity} to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Modal - Mobile Optimized */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-6xl h-[95vh] max-h-[95vh] p-0 gap-0 overflow-hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
          >
            <X className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" />
          </Button>

          {/* Mobile Layout: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col md:grid md:grid-cols-2 h-full overflow-hidden">
            {/* Image Gallery Section - FIXED HEIGHT */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
              {/* Fixed height container for mobile and desktop - INCREASED HEIGHT */}
              <div className="w-full h-[55vh] md:h-[75vh] relative overflow-hidden">
                <img
                  src={product.images[modalImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation for Modal */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevModalImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 p-0 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-900 sm:h-6 sm:w-6" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextModalImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 p-0 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-900 sm:h-6 sm:w-6" />
                    </Button>
                  </>
                )}

                {/* Category and Discount Badges */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 w-fit">
                    {product.category}
                  </Badge>
                  {hasDiscount && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 w-fit">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>

                {/* Image count indicator */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {modalImageIndex + 1}/{product.images.length}
                  </div>
                )}
              </div>

              {/* Image Thumbnails - Hidden on mobile, shown on desktop */}
              {product.images.length > 1 && (
                <div className="hidden md:block p-4 bg-white border-t">
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setModalImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === modalImageIndex 
                            ? 'border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details Section - Scrollable */}
            <div className="flex flex-col flex-1 min-h-0 bg-white">
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-4 sm:p-6 pb-24 md:pb-6">
                  {/* Product Title & Brand */}
                  <div className="mb-4">
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-800 mb-2 leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                        ₹{discountedPrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through">
                          ₹{originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                      
                      <span className="text-green-600 font-medium">In Stock</span>
                      {hasDiscount && (
                        <>
                          <span>•</span>
                          <span className="text-red-600 font-medium">
                            Save ₹{(originalPrice - discountedPrice).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product Features */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4 sm:my-6" />

                  {/* Quantity & Add to Cart Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800">Select Quantity</h3>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementModalQuantity}
                        disabled={modalQuantity === 0}
                        className="h-10 w-10 sm:h-12 sm:w-12 p-0 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" />
                      </Button>
                      
                      <div className="flex-1 text-center">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Quantity</div>
                        <div className="font-bold text-xl sm:text-2xl text-blue-600">
                          {modalQuantity}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementModalQuantity}
                        className="h-10 w-10 sm:h-12 sm:w-12 p-0 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full"
                      >
                        <Plus className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" />
                      </Button>
                    </div>

                    {/* Total Price Display */}
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-gray-700 font-medium">Total Price:</span>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">
                          ₹{modalQuantity > 0 ? (discountedPrice * modalQuantity).toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        {modalQuantity > 0 ? `${modalQuantity} × ₹${discountedPrice.toLocaleString()}` : 'Select quantity to see total'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Actions - Mobile */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white p-4 space-y-3 shadow-lg z-20">
                {/* Add to Cart Button */}
                <Button
                  onClick={handleModalAddToCart}
                  disabled={modalQuantity === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-bold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-800"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {modalQuantity === 0 ? 'Select Quantity' : `Add ${modalQuantity} to Cart`}
                </Button>
              </div>

              {/* Fixed Bottom Actions - Desktop */}
              <div className="hidden md:block border-t bg-white p-6 space-y-3">
                {/* Add to Cart Button */}
                <Button
                  onClick={handleModalAddToCart}
                  disabled={modalQuantity === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-800"
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  {modalQuantity === 0 ? 'Select Quantity' : `Add ${modalQuantity} to Cart`}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;