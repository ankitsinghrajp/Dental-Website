
import { Link } from 'react-router-dom';
import {  Shield, Award, Users, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProfessionalDoctorImage from "../assets/orthondontist-working-doctor.jpg"
import  { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import MetalBracketsImage from "../assets/metal-brackets.png"
import CeramicBracketsImage from "../assets/ceramic-brackets.jpeg"
import DentalHandpiecesImage from "../assets/dental-handpieces.webp"
import DiamondBurSetImage from "../assets/diamond-bur.jpg"
import LigatureTiesImage from "../assets/Ligature-ties.jpeg"
import FiberPostsImage from "../assets/fiberposts.jpg"


  const categories = [
    {
      name: "Dental Brackets",
      description: "Metal & Ceramic brackets for orthodontic treatment",
      image: "https://images.unsplash.com/photo-1720685193964-4529228a33c1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: "50+ Products"
    },
    {
      name: "Dental Handpieces",
      description: "High-speed and low-speed dental handpieces",
      image: "https://plus.unsplash.com/premium_photo-1673728795341-126301343e7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: "30+ Products"
    },
    {
      name: "Diamond Burs",
      description: "Professional diamond burs for dental procedures",
      image: "https://3.imimg.com/data3/AG/LH/MY-15712953/diamond-burs-crosstech-500x500.jpg",
      count: "200+ Products"
    },
    {
      name: "Dental Tools",
      description: "Complete range of dental instruments and tools",
      image: "https://plus.unsplash.com/premium_photo-1673728802507-355814421ca7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: "100+ Products"
    }
  ];

 const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "ISO certified dental equipment with highest quality standards"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery across India"
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "Comprehensive warranty on all products"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Professional dental equipment consultation"
    }
  ];

  

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Dental tools data based on your catalog
  const dentalTools = [
    {
      id: 1,
      image: MetalBracketsImage,
      title: "Metal Brackets",
      category: "Orthodontic Brackets",
      description: "Premium quality metal brackets with Roth 0.22 slot. Small footprint design for enhanced patient comfort.",
      features: ["MBT 0.22 slot", "Rhomboid-shaped bracket", "Horizontal aspects parallel to occlusal plane"],
      price: "₹2,500",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      image: CeramicBracketsImage,
      title: "Ceramic Brackets",
      category: "Aesthetic Brackets",
      description: "Class One ceramic brackets with superior aesthetics and durability. Perfect for adult orthodontics.",
      features: ["Aesthetic appeal", "High strength ceramic", "Smooth rounded edges"],
      price: "₹4,200",
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      image: DentalHandpiecesImage,
      title: "Dental Handpiece",
      category: "Rotary Instruments",
      description: "High-speed dental handpiece with contra angle design. Air pressure rotary system for precision work.",
      features: ["250-350 rpm speed", "Nickel-Titanium construction", "ISO certified"],
      price: "₹8,500",
      rating: 4.7,
      inStock: true
    },
    {
      id: 4,
      image: DiamondBurSetImage,
      title: "Diamond Burs Set",
      category: "Cutting Instruments",
      description: "Global Diamond Bur set with micro processing technology. Multiple grit sizes for various applications.",
      features: ["FG shank design", "125-150 grit options", "Electroplated finish"],
      price: "₹3,800",
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      image: LigatureTiesImage,
      title: "Ligature Ties",
      category: "Orthodontic Accessories",  
      description: "Colorful elastomeric ligature ties in various colors. Perfect for pediatric and adult orthodontics.",
      features: ["Multiple color options", "Latex-free material", "Easy application"],
      price: "₹450",
      rating: 4.5,
      inStock: true
    },
    {
      id: 6,
      image: FiberPostsImage,
      title: "Fiber Posts",
      category: "Endodontic Materials",
      description: "High-quality fiber posts for root canal procedures. Available in multiple sizes with drills included.",
      features: ["4 pieces high quality drills", "20 pieces fiber posts", "Multiple size options"],
      price: "₹2,200",
      rating: 4.4,
      inStock: true
    }
  ];

  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(3); // Desktop: 3 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, dentalTools.length - itemsPerView);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <div className="min-h-screen">

      <section className="bg-gradient-hero shadow-md  shadow-black/60 mb-20 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 shadow-md shadow-black/30 py-2 px-4 text-white border-white/30 mb-6">
            Trusted by 1000+ Dental Professionals
          </Badge>
          <h1 className="text-4xl text-shadow md:text-6xl font-bold mb-6">
            Premium Dental Equipment
            <span className="block text-dental-blue-light">& Supplies</span>
          </h1>
          <p className="text-xl text-shadow text-white/90 mb-8 max-w-2xl mx-auto">
            Your trusted partner for high-quality dental equipment, tools, and supplies. 
            Serving dental professionals across India with excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className='bg-green-500 w-full shadow-md shadow-black/30' variant="outline" size="lg">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white w-full shadow-md shadow-black/30 text-blue-600 hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Hero Carousel */}
  
     {/* Feature Section */}
    <section className="py-10 px-4 bg-dental-blue-light/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Tina Dent?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the highest quality dental equipment with exceptional service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-md shadow-gray-800/20 hover:shadow-gray-800/30 transition-smooth">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Product Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Premium Dental Equipment
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality dental tools and equipment 
            designed for modern dental practices
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {dentalTools.map((tool) => (
                <div 
                  key={tool.id}
                  className={`flex-shrink-0 p-2 ${
                    itemsPerView === 1 ? 'w-full' : 
                    itemsPerView === 2 ? 'w-1/2' : 
                    'w-1/3'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg shadow-black/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {tool.category}
                        </span>
                      </div>
                     
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {tool.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {tool.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Rating and Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">
                            {tool.rating}
                          </span>
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {tool.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 p-6 bg-blue-600 text-white rounded-xl">
          <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
          <p className="mb-4">Contact our dental equipment specialists for personalized recommendations</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <span>📧 pusharkumar15@gmail.com</span>
            <span>📱 7503772789, 7503772012</span>
          </div>
        </div>
      </div>
    </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Tina Dent</h2>
              <p className="text-muted-foreground mb-4">
                With over 15 years of experience in the dental industry, Tina Dent has been a trusted 
                partner for dental professionals worldwide. We specialize in providing high-quality, 
                precision-engineered dental instruments that meet the demanding standards of modern dentistry.
              </p>
              <p className="text-muted-foreground mb-6">
                Our commitment to excellence extends beyond our products. We work closely with dental 
                professionals to understand their needs and continuously innovate our product line to 
                deliver the best tools for superior patient care.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">400+</div>
                  <div className="text-sm text-muted-foreground">Premium Products</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src = {ProfessionalDoctorImage}
                alt="Professional dental equipment"
                className="w-full h-auto rounded-lg shadow-medium"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

     {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Top Product Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive range of dental equipment for all your professional needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-medium transition-smooth cursor-pointer border-border/50">
                <CardContent className="p-0">
                  <div className="aspect-square bg-dental-blue-light/30 relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-smooth" />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-2">{category.count}</Badge>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;