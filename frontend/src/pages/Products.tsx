import React, { useEffect,useState, useMemo } from 'react';
import Papa from "papaparse";
import { Search, Filter, Grid, X, ChevronDown, Package, Sparkles, Plus, User, LogOut } from 'lucide-react';
import { useSmootherScrolling } from '@/hooks/useSmootherScrolling';
import ProductCard from '@/components/ProductCard';
import AddProductForm from '@/components/AddProductForm';
import AuthModal from '@/components/AuthModal';
import {  categories, popularTags } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { apiService, Product } from '@/services/api';

const PRODUCTS_PER_PAGE = 20;

const Products = () => {
  useSmootherScrolling();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Initialize all states with clean defaults
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [useBackendData, setUseBackendData] = useState(false);

  // Fetch products from backend or CSV
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      if (useBackendData) {
        try {
          const backendProducts = await apiService.getProducts();
          // Transform backend products to match frontend format
          const transformedProducts = backendProducts.map((product) => ({
            id: product._id || product.id,
            name: product.name,
            description: product.description,
            original_price: product.price,
            discounted_price: product.price,
            category: product.category || 'General',
            tags: product.tags || [],
            images: product.image ? [product.image] : [],
          }));
          setProducts(transformedProducts);
        } catch (error) {
          console.error("Error fetching from backend:", error);
          // Fallback to CSV if backend fails
          fetchCSVData();
        }
      } else {
        fetchCSVData();
      }
    };

    const fetchCSVData = () => {
      fetch("/products.csv")
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const parsedProducts = result.data.map((product) => ({
                ...product,
                original_price: Number(product.original_price) || 0,
                discounted_price: Number(product.discounted_price) || 0,
                tags: product.tags
                  ? product.tags.split(",").map((tag) => tag.trim())
                  : [],
                images: product.images
                  ? product.images.split(",").map((img) => img.trim())
                  : [],
              }));

              // Filter out invalid products
              const validProducts = parsedProducts.filter(
                (product) =>
                  product.name &&
                  product.description &&
                  product.category &&
                  product.original_price > 0
              );

              setProducts(validProducts);
              setIsLoading(false);
            },
            error: (error) => {
              console.error("Error parsing CSV:", error);
              setIsLoading(false);
            },
          });
        })
        .catch((error) => {
          console.error("Error fetching CSV:", error);
          setIsLoading(false);
        });
    };

    fetchProducts();
  }, [useBackendData]);


  // Filter products based on search query, category, and tags
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    
    return products.filter(product => {
      // Ensure product has required fields
      if (!product.name || !product.description || !product.category) {
        return false;
      }

      const matchesSearch = searchQuery === '' || 
                           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => product.tags && product.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [products, searchQuery, selectedCategory, selectedTags]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedTags.length > 0;

  const handleProductAdded = (newProduct: Product) => {
    // Add the new product to the current list
    const transformedProduct = {
      id: newProduct._id || newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      original_price: newProduct.price,
      discounted_price: newProduct.price,
      category: newProduct.category || 'General',
      tags: newProduct.tags || [],
      images: newProduct.image ? [newProduct.image] : [],
    };
    
    setProducts(prev => [transformedProduct, ...prev]);
    setShowAddProduct(false);
  };

  const handleAddProductClick = () => {
    if (isAuthenticated) {
      setShowAddProduct(true);
    } else {
      setShowAuthModal(true);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-hero shadow-lg text-white py-8 sm:py-16 px-3 sm:px-4 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <Badge className="bg-white/20 backdrop-blur-sm py-1.5 sm:py-2 px-3 sm:px-4 shadow-md shadow-black/30 text-white border-white/30 rounded-full text-xs sm:text-sm">
              {products.length}+ Premium Products
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl text-shadow md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            Professional Dental Equipment
          </h1>
          <p className="text-base sm:text-xl text-shadow text-white/90 max-w-3xl mx-auto px-4">
            Discover our comprehensive collection of premium dental instruments crafted for excellence. 
            Find the perfect tools to elevate your practice.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Data Source Toggle and User Actions */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Data Source:</span>
              <Button
                variant={useBackendData ? "default" : "outline"}
                size="sm"
                onClick={() => setUseBackendData(true)}
              >
                Backend API
              </Button>
              <Button
                variant={!useBackendData ? "default" : "outline"}
                size="sm"
                onClick={() => setUseBackendData(false)}
              >
                CSV Data
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
                <Button
                  onClick={handleAddProductClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant="outline"
              >
                <User className="h-4 w-4 mr-1" />
                Login to Add Products
              </Button>
            )}
          </div>
        </div>
        {/* Enhanced Search Section */}
       <Card className="mb-6 sm:mb-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-lg rounded-2xl overflow-hidden">
  <CardContent className="p-0">
    {/* Header Section with Search */}
    <div className="bg-gradient-hero p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 space-y-4 sm:space-y-6">
        {/* Main Search Bar */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search for dental brands..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-5 text-base sm:text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl focus:ring-4 focus:ring-blue-300/30 transition-all duration-300 shadow-lg hover:shadow-xl placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="font-medium text-white text-sm sm:text-base">Quick Filter:</span>
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-48 bg-white/90 backdrop-blur-sm border-0 rounded-lg hover:bg-white transition-all duration-200 shadow-md">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <SelectItem value="all" className="font-medium rounded-lg">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize rounded-lg">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>

    {/* Filter Controls Section */}
    <div className="p-4 sm:p-6 bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={`border-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto ${
              showFilters 
                ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-500 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-500 shadow-sm'
            }`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Advanced Tags
          </Button>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="border-2 border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>

    {/* Tag Filters Section */}
    {showFilters && (
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-in slide-in-from-top-4 duration-500 ease-out">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center mb-4 sm:mb-5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2 mr-2 sm:mr-3">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Filter by Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {popularTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl hover:scale-110 transform ${
                  selectedTags.includes(tag) 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="h-2 w-2 sm:h-3 sm:w-3 ml-1 sm:ml-2 opacity-80" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )}
  </CardContent>
</Card>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-blue-800">Active filters:</span>
              {searchQuery && (
                <Badge variant="outline" className="bg-white border-blue-300 text-blue-700 text-xs">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="bg-white border-blue-300 text-blue-700 capitalize text-xs">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-white border-blue-300 text-blue-700 text-xs">
                  Tag: {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm gap-2 sm:gap-0">
          <div className="flex items-center space-x-3 text-gray-600">
            <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">
              Showing <span className="text-blue-600 font-bold">{paginatedProducts.length}</span> of{' '}
              <span className="text-blue-600 font-bold">{filteredProducts.length}</span> products
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Page {currentPage} of {Math.max(1, totalPages)}
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : !isLoading ? (
          <Card className="mb-8 sm:mb-12 border-0 shadow-lg">
            <CardContent className="text-center py-12 sm:py-16 px-4">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 opacity-20">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">No products found</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                We couldn't find any products matching your criteria. 
                Try adjusting your search terms or browse all products.
              </p>
              <Button 
                onClick={clearAllFilters} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-8 sm:mb-12 overflow-x-auto">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4"
            >
              Previous
            </Button>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`min-w-[36px] sm:min-w-[44px] transition-all duration-200 text-xs sm:text-sm ${
                    currentPage === pageNumber 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-500"
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4"
            >
              Next
            </Button>
          </div>
        )}

        {/* Contact Information */}
        <Card className="mb-6 sm:mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Need Expert Guidance?</h3>
            <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Our dental equipment specialists are here to help you find the perfect instruments for your practice. 
              Get personalized recommendations tailored to your needs.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:items-center sm:space-y-0 sm:space-x-8 text-xs sm:text-sm">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg sm:text-xl">📧</span>
                <span className="font-medium">pusharkumar15@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg sm:text-xl">📱</span>
                <span className="font-medium">7503772789, 7503772012</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <AddProductForm
            onProductAdded={handleProductAdded}
            onClose={() => setShowAddProduct(false)}
          />
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Products;