import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle, Star, Shield, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
     toast.error("Please fill all the required fields")
      return;
    }

    setIsSubmitting(true);
    
    // Format the message for WhatsApp
    let whatsappMessage = `*New Contact Form Submission*\n\n`;
    whatsappMessage += `*Name:* ${formData.name}\n`;
    whatsappMessage += `*Email:* ${formData.email}\n`;
    
    if (formData.phone.trim()) {
      whatsappMessage += `*Phone:* ${formData.phone}\n`;
    }
    
    if (formData.subject.trim()) {
      whatsappMessage += `*Subject:* ${formData.subject}\n`;
    }
    
    whatsappMessage += `\n*Message:*\n${formData.message}\n\n`;
    whatsappMessage += `---\nSent from DentalMart Contact Form`;
    
    // Send to WhatsApp immediately
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to inquire about your dental equipment and tools.";
    const whatsappURL = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@dentalmart.com', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Section */}
   
        <section className="bg-gradient-hero shadow-lg text-white py-8 sm:py-16 px-3 sm:px-4 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
          
            <Badge className="bg-white/20 backdrop-blur-sm text-blue-50 py-1.5 sm:py-2 px-3 sm:px-4 shadow-md shadow-black/30 border-white/30 rounded-full text-xs sm:text-sm">
               <MessageCircle className="w-4 h-4 mr-2" /> Contact Support
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            Get in Touch
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto px-4">
           Professional dental equipment solutions with expert guidance and dedicated support
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 md:px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-blue-100">Message will be sent directly to our WhatsApp</p>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="What's this about?"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none resize-none"
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <button 
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending to WhatsApp...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5 mr-3" />
                          Send via WhatsApp
                        </>
                      )}
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      123 Medical District<br />
                      Connaught Place, New Delhi<br />
                      Delhi 110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600 text-sm">+91 9876543210</p>
                    <p className="text-gray-600 text-sm">+91 1123456789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Addresses</h4>
                    <p className="text-gray-600 text-sm">info@dentalmart.com</p>
                    <p className="text-gray-600 text-sm">support@dentalmart.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  WhatsApp Chat
                </button>
                
                <button 
                  onClick={handlePhoneCall}
                  className="w-full border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  Call Directly
                </button>
                
                <button 
                  onClick={handleEmailClick}
                  className="w-full border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 text-purple-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Send Email
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Support Promise</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive support to ensure you get the most out of your investment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support for technical issues and product queries
              </p>
            </div>

            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional consultation from dental equipment specialists
              </p>
            </div>

            <div className="group text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                Premium products with comprehensive warranty and quality guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-lg text-gray-900 mb-3">What is your return policy?</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a 30-day return policy for all dental equipment. Items must be in original condition with all accessories included.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Do you provide installation support?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide free installation guidance and technical support for all major dental equipment purchases.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-lg text-gray-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600 leading-relaxed">
                We accept all major credit cards, debit cards, UPI, net banking, and also offer EMI options for eligible purchases.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Do you offer bulk discounts?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide special pricing for bulk orders and institutional purchases. Contact us for custom quotes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Showroom</h2>
            <p className="text-gray-600 text-lg">
              Experience our dental equipment collection in person
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.6206644393656!2d77.2166!3d28.6285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd442184a405%3A0xe63b32b98bb97311!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DentalMart Showroom Location"
              className="w-full"
            />
          </div>
        </div>
      </div>

         <Card className="mb-6 max-w-7xl hidden md:block mx-auto sm:mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
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
  );
};

export default Contact;