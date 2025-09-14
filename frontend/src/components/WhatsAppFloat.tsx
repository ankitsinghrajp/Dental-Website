import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your dental tools. Can you help me?");
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="floating-element bottom-6 right-6 bg-accent hover:bg-accent/90 text-accent-foreground p-4 hover:scale-110 shadow-primary"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppFloat;