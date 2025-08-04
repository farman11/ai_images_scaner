import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Star, TrendingUp } from "lucide-react";

interface GoogleAdProps {
  type?: 'banner' | 'card' | 'sidebar';
  position?: 'top' | 'bottom' | 'inline';
  animated?: boolean;
}

export default function GoogleAd({ type = 'card', position = 'inline', animated = true }: GoogleAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Sample ad content - in real implementation, this would come from Google AdSense
  const adContent = [
    {
      title: "Advanced AI Image Tools",
      description: "Professional AI image editing and enhancement tools for creators",
      url: "aitools.example.com",
      cta: "Try Free",
      rating: 4.8,
      reviews: "2.3k",
      image: "🎨"
    },
    {
      title: "Photo Forensics Pro",
      description: "Professional image authentication and forensic analysis software",
      url: "forensics.example.com", 
      cta: "Learn More",
      rating: 4.9,
      reviews: "1.8k",
      image: "🔍"
    },
    {
      title: "AI Detection API",
      description: "Integrate AI detection capabilities into your applications",
      url: "api.example.com",
      cta: "Get API Key",
      rating: 4.7,
      reviews: "956",
      image: "⚡"
    }
  ];

  useEffect(() => {
    if (animated) {
      // Animate in after a short delay
      const timer = setTimeout(() => setIsVisible(true), 500);
      
      // Rotate ads every 10 seconds
      const rotationTimer = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % adContent.length);
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearInterval(rotationTimer);
      };
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const currentAd = adContent[currentAdIndex];

  if (type === 'banner') {
    return (
      <div className={`
        w-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6
        transition-all duration-1000 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${animated ? 'hover:scale-[1.02] hover:shadow-lg' : ''}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{currentAd.image}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentAd.title}</h3>
              <p className="text-sm text-gray-600">{currentAd.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {currentAd.rating} ({currentAd.reviews})
            </Badge>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              {currentAd.cta}
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Ad • {currentAd.url}
        </div>
      </div>
    );
  }

  return (
    <Card className={`
      w-full transition-all duration-1000 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
      ${animated ? 'hover:shadow-xl hover:-translate-y-1' : ''}
      bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100
    `}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Sponsored
          </Badge>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start space-x-4">
          <div className={`
            text-4xl transform transition-transform duration-700 ease-out
            ${isVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-75'}
          `}>
            {currentAd.image}
          </div>
          
          <div className="flex-1">
            <h3 className={`
              font-bold text-lg text-gray-900 mb-2 transition-all duration-500 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}>
              {currentAd.title}
            </h3>
            
            <p className={`
              text-gray-600 text-sm mb-4 transition-all duration-700 ease-out delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}>
              {currentAd.description}
            </p>

            <div className={`
              flex items-center justify-between transition-all duration-900 ease-out delay-400
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`
                        w-4 h-4 transition-all duration-300 delay-${(i + 1) * 100}
                        ${i < Math.floor(currentAd.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                        }
                      `} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentAd.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({currentAd.reviews} reviews)
                </span>
              </div>
              
              <Button 
                className={`
                  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                  transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                  text-white font-semibold
                `}
                size="sm"
              >
                {currentAd.cta}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className={`
          mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between
          transition-all duration-1000 ease-out delay-600
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <span>Ad • {currentAd.url}</span>
          <div className="flex space-x-1">
            {adContent.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentAdIndex ? 'bg-blue-400' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}