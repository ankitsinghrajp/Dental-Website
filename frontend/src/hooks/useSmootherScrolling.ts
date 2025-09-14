import { useEffect } from 'react';

export const useSmootherScrolling = () => {
  useEffect(() => {
    // Enhanced smooth scrolling for the entire document
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth !important;
        scroll-padding-top: 80px;
      }
      
      * {
        scroll-behavior: smooth !important;
      }
      
      /* Smooth transitions for page changes */
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    // Handle hash links with smooth scrolling
    const handleHashLinks = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    };

    // Add smooth scrolling to all anchor links
    document.addEventListener('click', handleHashLinks);

    return () => {
      document.removeEventListener('click', handleHashLinks);
      document.head.removeChild(style);
    };
  }, []);
};

export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};