import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ArrowRight,
  Shield,
  Clock,
  Zap,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What is AI Detection Checker?",
    answer: "AI Detection Checker is an advanced image analysis platform that determines whether images are AI-generated or authentic photographs. Using a combination of deep learning neural networks and traditional computer vision forensics, we provide professional-grade detection with 96.8% accuracy."
  },
  {
    category: "General",
    question: "How accurate is the AI detection?",
    answer: "Our system achieves 96.8% overall accuracy through a hybrid approach combining ResNet50 deep learning with 6 advanced computer vision algorithms including texture analysis, frequency domain detection, compression forensics, and metadata examination."
  },
  {
    category: "Technical",
    question: "What image formats are supported?",
    answer: "We support JPG, JPEG, PNG, and WebP formats. Images can be up to 10MB in size. Our system processes all standard image formats while maintaining optimal analysis quality."
  },
  {
    category: "Technical",
    question: "How long does analysis take?",
    answer: "Most images are analyzed within 2-3 seconds. Processing time depends on image size and complexity, but our optimized algorithms ensure fast results without compromising accuracy."
  },
  {
    category: "Privacy",
    question: "Is my uploaded image stored on your servers?",
    answer: "No, we do not store any uploaded images. All images are processed in real-time and immediately deleted after analysis. We prioritize user privacy and data security."
  },
  {
    category: "Privacy",
    question: "How do you protect user privacy?",
    answer: "We use enterprise-grade security measures including encrypted data transmission, secure processing environments, and immediate data deletion. No personal information or images are retained after analysis."
  },
  {
    category: "Technical",
    question: "What AI detection algorithms do you use?",
    answer: "Our hybrid system combines: (1) ResNet50 deep learning CNN, (2) Local Binary Pattern texture analysis, (3) GLCM texture analysis, (4) FFT frequency domain analysis, (5) JPEG compression forensics, and (6) EXIF metadata examination."
  },
  {
    category: "Usage",
    question: "Can I use this for commercial purposes?",
    answer: "Yes, our detection service can be used for commercial purposes including content verification, media forensics, and authentication workflows. Contact us for enterprise solutions and API access."
  },
  {
    category: "Technical",
    question: "What types of AI-generated images can you detect?",
    answer: "Our system can detect images from various AI generators including DALL-E, Midjourney, Stable Diffusion, StyleGAN, and other GAN-based models. We continuously update our detection capabilities."
  },
  {
    category: "Usage",
    question: "Are there any usage limitations?",
    answer: "Free users can analyze images with standard processing. For high-volume usage, batch processing, or API access, premium plans are available with enhanced features and priority support."
  },
  {
    category: "Technical",
    question: "How do you handle false positives?",
    answer: "Our multi-algorithm approach minimizes false positives by cross-validating results across 6 different detection methods. Each indicator is weighted based on reliability and context."
  },
  {
    category: "General",
    question: "Who developed this technology?",
    answer: "AI Detection Checker is developed by RootGroup.tech, a technology company specializing in AI, machine learning, and computer vision solutions for enterprise and consumer applications."
  }
];

const categories = ["All", "General", "Technical", "Privacy", "Usage"];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Eye className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Detection Checker</h1>
                <p className="text-sm text-slate-500">by RootGroup.tech</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">Home</Link>
              <Link href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-medium">How it works</Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium">About</Link>
              <span className="text-blue-600 font-medium">FAQ</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Frequently Asked Questions</Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Got Questions? We've Got Answers
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our AI detection technology, privacy policies, and usage guidelines.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">2.1s</h3>
              <p className="text-slate-600 text-sm">Average Processing Time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">96.8%</h3>
              <p className="text-slate-600 text-sm">Detection Accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">100%</h3>
              <p className="text-slate-600 text-sm">Privacy Protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
              <p className="text-slate-600 text-sm">Service Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => {
              const globalIndex = faqData.indexOf(item);
              const isOpen = openItems.includes(globalIndex);
              
              return (
                <Card key={globalIndex} className="shadow-md border-0 bg-white/70 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {item.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.question}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 pl-20">
                        <p className="text-slate-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Still Have Questions?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you with any questions about our AI detection technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Live Chat Support</h3>
                <p className="text-slate-600 mb-6">
                  Get instant help from our technical support team. Available 24/7 for all your questions.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Email Support</h3>
                <p className="text-slate-600 mb-6">
                  Send us detailed questions and we'll get back to you within 24 hours with comprehensive answers.
                </p>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => window.location.href = 'mailto:support@rootgroup.tech'}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Try Our AI Detection?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience professional-grade AI image detection with our advanced multi-algorithm system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                Try Detection Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
              >
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Eye className="text-white h-4 w-4" />
                </div>
                <span className="text-xl font-bold">AI Detection Checker</span>
              </div>
              <p className="text-slate-400 mb-4">Developed by RootGroup.tech - Advanced AI-powered image authenticity verification.</p>
              <div className="flex space-x-4">
                <a href="https://rootgroup.tech/" className="text-slate-400 hover:text-white">Visit RootGroup.tech</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="https://rootgroup.tech/" className="hover:text-white">RootGroup.tech</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AI Detection Checker by RootGroup.tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}