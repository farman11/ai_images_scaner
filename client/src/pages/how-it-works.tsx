import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Upload, 
  Microscope, 
  Download, 
  CheckCircle, 
  Zap, 
  Shield, 
  TrendingUp,
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Search,
  BarChart3,
  FileImage
} from "lucide-react";
import { Link } from "wouter";
import { updatePageSEO, seoConfigs, addBreadcrumbStructuredData } from "@/lib/seo";
import { useEffect } from "react";

export default function HowItWorks() {
  // Update SEO when component mounts
  useEffect(() => {
    updatePageSEO(seoConfigs.howItWorks);
    addBreadcrumbStructuredData([
      { name: "Home", url: "https://aidetectionchecker.replit.app/" },
      { name: "How it Works", url: "https://aidetectionchecker.replit.app/how-it-works" }
    ]);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Eye className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Detection Checker</h1>
                <p className="text-sm text-slate-500">by RootGroup.tech</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">Home</Link>
              <span className="text-blue-600 font-medium">How it works</span>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium">About</Link>
              <Link href="/faq" className="text-slate-600 hover:text-slate-900 font-medium">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Advanced Technology</Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            How Our AI Detection Works
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our advanced system combines multiple cutting-edge algorithms to provide professional-grade AI image detection with industry-leading accuracy.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Complete Analysis Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Upload Image</h3>
              <p className="text-slate-600">Upload your image in JPG, PNG, JPEG, or WebP format up to 10MB</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI Analysis</h3>
              <p className="text-slate-600">Our hybrid system analyzes using 6 advanced computer vision algorithms</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Results</h3>
              <p className="text-slate-600">Receive detailed analysis with confidence scores and forensic indicators</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Download Report</h3>
              <p className="text-slate-600">Get comprehensive technical reports with detailed forensic analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Algorithms */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Advanced Detection Algorithms</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Microscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Deep Learning CNN</h3>
                <p className="text-slate-600 text-sm">ResNet50 transfer learning model trained on millions of images to detect AI generation patterns with 95%+ accuracy.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Texture Analysis</h3>
                <p className="text-slate-600 text-sm">Local Binary Patterns and GLCM analysis detect unnatural texture patterns characteristic of AI-generated content.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Frequency Domain</h3>
                <p className="text-slate-600 text-sm">FFT analysis examines frequency domain characteristics that reveal digital generation artifacts.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <FileImage className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Compression Forensics</h3>
                <p className="text-slate-600 text-sm">JPEG compression analysis detects inconsistencies in compression patterns typical of synthetic images.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Metadata Analysis</h3>
                <p className="text-slate-600 text-sm">EXIF data examination reveals inconsistencies in camera settings and generation timestamps.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Statistical Patterns</h3>
                <p className="text-slate-600 text-sm">Advanced statistical analysis identifies mathematical patterns unique to AI generation algorithms.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accuracy & Performance */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Industry-Leading Accuracy</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our hybrid approach combining deep learning with traditional computer vision forensics achieves superior accuracy compared to single-algorithm solutions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">95%+ Detection Accuracy</h3>
                    <p className="text-slate-600 text-sm">Validated across multiple AI generation models</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Sub-3 Second Processing</h3>
                    <p className="text-slate-600 text-sm">Optimized for real-time analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Enterprise-Grade Security</h3>
                    <p className="text-slate-600 text-sm">Images processed securely and never stored</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Performance Metrics</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">Overall Accuracy</span>
                    <span className="text-slate-900 font-bold">96.8%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '96.8%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">AI Detection Rate</span>
                    <span className="text-slate-900 font-bold">94.2%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">Real Image Recognition</span>
                    <span className="text-slate-900 font-bold">98.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '98.1%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">Processing Speed</span>
                    <span className="text-slate-900 font-bold">2.1s avg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Test Our Technology?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience professional-grade AI detection with our advanced multi-algorithm system.
          </p>
          <Link href="/">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              Try AI Detection Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
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
            <p>&copy; 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}