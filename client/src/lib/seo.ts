// SEO utilities for dynamic meta tag management

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const updatePageSEO = (config: SEOConfig) => {
  // Update title
  document.title = config.title;
  
  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property = false) => {
    const attribute = property ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  // Update description
  updateMetaTag('description', config.description);
  
  // Update keywords if provided
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }
  
  // Update Open Graph tags
  updateMetaTag('og:title', config.ogTitle || config.title, true);
  updateMetaTag('og:description', config.ogDescription || config.description, true);
  
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage, true);
  }
  
  // Update canonical URL if provided
  if (config.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonicalUrl;
  }
  
  // Add structured data if provided
  if (config.structuredData) {
    // Remove existing structured data for this page
    const existingScript = document.querySelector('script[data-page-schema]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', 'true');
    script.textContent = JSON.stringify(config.structuredData);
    document.head.appendChild(script);
  }
};

// Predefined SEO configurations for each page
export const seoConfigs = {
  home: {
    title: "AI Detection Checker - Professional AI Image Detection Tool | RootGroup.tech",
    description: "Advanced AI image detection tool with 96.8% accuracy. Detect AI-generated images from DALL-E, Midjourney, Stable Diffusion using deep learning and computer vision. Free analysis with instant results.",
    keywords: "AI detection, image analysis, deepfake detection, AI generated images, computer vision, machine learning, image forensics, AI checker, artificial intelligence detection",
    ogTitle: "AI Detection Checker - Professional AI Image Detection Tool",
    canonicalUrl: "https://aidetectionchecker.replit.app/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Detection Checker",
      "description": "Advanced AI image detection tool with 96.8% accuracy using deep learning and computer vision algorithms",
      "url": "https://aidetectionchecker.replit.app/",
      "applicationCategory": "Multimedia",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "RootGroup.tech",
        "url": "https://rootgroup.tech"
      },
      "featureList": [
        "AI image detection",
        "96.8% accuracy rate",
        "Multiple AI model detection",
        "Real-time analysis",
        "Detailed forensic reports"
      ]
    }
  },
  
  about: {
    title: "About AI Detection Checker - Advanced Computer Vision Technology | RootGroup.tech",
    description: "Learn about our AI detection technology, company mission, and the team behind the industry-leading image analysis platform. Discover how we achieve 96.8% accuracy in AI detection.",
    keywords: "about AI detection, computer vision technology, RootGroup.tech, AI image analysis company, machine learning expertise, image forensics team",
    ogTitle: "About AI Detection Checker - Advanced Computer Vision Technology",
    canonicalUrl: "https://aidetectionchecker.replit.app/about",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About AI Detection Checker",
      "description": "Learn about our AI detection technology and the team behind the platform",
      "url": "https://aidetectionchecker.replit.app/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "RootGroup.tech",
        "description": "Leading technology company specializing in AI, machine learning, and advanced computer vision solutions",
        "foundingDate": "2020",
        "numberOfEmployees": "50+",
        "serviceArea": {
          "@type": "Place",
          "name": "Global"
        }
      }
    }
  },
  
  howItWorks: {
    title: "How AI Detection Works - Technical Deep Dive into Detection Algorithms | AI Checker",
    description: "Discover our 6-algorithm hybrid system: ResNet50 CNN, texture analysis, frequency domain detection, compression forensics, and metadata examination. Learn the technical process.",
    keywords: "how AI detection works, ResNet50, computer vision algorithms, texture analysis, frequency domain, compression forensics, EXIF metadata, technical explanation",
    ogTitle: "How AI Detection Works - Technical Deep Dive",
    canonicalUrl: "https://aidetectionchecker.replit.app/how-it-works",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How AI Image Detection Works",
      "description": "Step-by-step process of how our AI detection system analyzes images",
      "image": "https://aidetectionchecker.replit.app/how-it-works-diagram.jpg",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Upload Image",
          "text": "Upload your image in JPG, PNG, JPEG, or WebP format up to 10MB"
        },
        {
          "@type": "HowToStep", 
          "name": "AI Analysis",
          "text": "Our hybrid system analyzes using 6 advanced computer vision algorithms"
        },
        {
          "@type": "HowToStep",
          "name": "Get Results", 
          "text": "Receive detailed analysis with confidence scores and forensic indicators"
        },
        {
          "@type": "HowToStep",
          "name": "Download Report",
          "text": "Get comprehensive technical reports with detailed forensic analysis"
        }
      ]
    }
  },
  
  faq: {
    title: "AI Detection FAQ - Common Questions About Image Analysis | AI Checker",
    description: "Find answers to frequently asked questions about AI image detection, accuracy rates, privacy policies, supported formats, and technical specifications. Get help with our detection tool.",
    keywords: "AI detection FAQ, frequently asked questions, image analysis help, AI checker support, detection accuracy, privacy policy, technical specifications",
    ogTitle: "AI Detection FAQ - Common Questions Answered",
    canonicalUrl: "https://aidetectionchecker.replit.app/faq",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Detection Checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Detection Checker is an advanced image analysis platform that determines whether images are AI-generated or authentic photographs. Using a combination of deep learning neural networks and traditional computer vision forensics, we provide professional-grade detection with 96.8% accuracy."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the AI detection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our system achieves 96.8% overall accuracy through a hybrid approach combining ResNet50 deep learning with 6 advanced computer vision algorithms including texture analysis, frequency domain detection, compression forensics, and metadata examination."
          }
        },
        {
          "@type": "Question",
          "name": "What image formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support JPG, JPEG, PNG, and WebP formats. Images can be up to 10MB in size. Our system processes all standard image formats while maintaining optimal analysis quality."
          }
        }
      ]
    }
  }
};

// Additional SEO utilities
export const addJsonLd = (data: object, id: string) => {
  // Remove existing JSON-LD with same ID
  const existingScript = document.querySelector(`script[data-json-ld="${id}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-json-ld', id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Breadcrumb structured data
export const addBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  addJsonLd(breadcrumbData, 'breadcrumb');
};

// Organization structured data
export const addOrganizationStructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RootGroup.tech",
    "url": "https://rootgroup.tech",
    "logo": "https://aidetectionchecker.replit.app/logo.png",
    "description": "Leading technology company specializing in AI, machine learning, and advanced computer vision solutions",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@rootgroup.tech"
    },
    "sameAs": [
      "https://twitter.com/rootgrouptech",
      "https://linkedin.com/company/rootgrouptech"
    ]
  };
  
  addJsonLd(organizationData, 'organization');
};

// WebSite structured data with search functionality
export const addWebsiteStructuredData = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Detection Checker",
    "url": "https://aidetectionchecker.replit.app/",
    "description": "Advanced AI image detection tool with 96.8% accuracy",
    "publisher": {
      "@type": "Organization",
      "name": "RootGroup.tech"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aidetectionchecker.replit.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  addJsonLd(websiteData, 'website');
};