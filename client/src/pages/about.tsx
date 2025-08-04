import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Users, 
  Award, 
  Target, 
  Lightbulb, 
  Shield, 
  Globe, 
  ArrowRight,
  Building,
  Calendar,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { updatePageSEO, seoConfigs, addBreadcrumbStructuredData } from "@/lib/seo";
import { useEffect } from "react";

export default function About() {
  // Update SEO when component mounts
  useEffect(() => {
    updatePageSEO(seoConfigs.about);
    addBreadcrumbStructuredData([
      { name: "Home", url: "https://aidetectionchecker.replit.app/" },
      { name: "About", url: "https://aidetectionchecker.replit.app/about" }
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
              <Link href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-medium">How it works</Link>
              <span className="text-blue-600 font-medium">About</span>
              <Link href="/faq" className="text-slate-600 hover:text-slate-900 font-medium">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">About Us</Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pioneering AI Detection Technology
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Developed by RootGroup.tech, we're committed to providing the most advanced and reliable AI image detection solutions for the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                In an era where AI-generated content is becoming increasingly sophisticated, we provide the tools and expertise needed to distinguish between authentic and synthetic media.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Our mission is to empower individuals, businesses, and organizations with professional-grade AI detection capabilities, ensuring transparency and trust in digital content.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-slate-700">Advancing digital authenticity verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-slate-700">Protecting against misinformation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-slate-700">Empowering informed decision-making</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">96.8%</h3>
                  <p className="text-slate-600">Detection Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">50K+</h3>
                  <p className="text-slate-600">Images Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">120+</h3>
                  <p className="text-slate-600">Countries Served</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                  <p className="text-slate-600">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About RootGroup.tech */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About RootGroup.tech</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              RootGroup.tech is a leading technology company specializing in AI, machine learning, and advanced computer vision solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Enterprise Solutions</h3>
                <p className="text-slate-600">
                  We develop cutting-edge AI solutions for enterprises, focusing on practical applications that solve real-world challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Innovation Focus</h3>
                <p className="text-slate-600">
                  Our team of experts continuously researches and develops innovative AI technologies to stay ahead of emerging challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Security First</h3>
                <p className="text-slate-600">
                  We prioritize security and privacy in all our solutions, ensuring data protection and user trust at every level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Values & Principles</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Accuracy & Reliability</h3>
                  <p className="text-slate-600">
                    We strive for the highest levels of accuracy in our detection algorithms, continuously improving through rigorous testing and validation.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Privacy & Security</h3>
                  <p className="text-slate-600">
                    User privacy is paramount. We process images securely and never store personal data or uploaded content after analysis.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">User-Centric Design</h3>
                  <p className="text-slate-600">
                    Our solutions are designed with users in mind, providing intuitive interfaces and clear, actionable results.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Continuous Innovation</h3>
                  <p className="text-slate-600">
                    We invest heavily in research and development to stay ahead of evolving AI generation technologies and detection challenges.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Global Accessibility</h3>
                  <p className="text-slate-600">
                    Our platform is designed to be accessible worldwide, providing essential AI detection capabilities to users everywhere.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Excellence & Quality</h3>
                  <p className="text-slate-600">
                    We maintain the highest standards of quality in our technology, ensuring professional-grade results for all users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Powered by Advanced Technology</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our platform leverages state-of-the-art technologies to deliver unparalleled AI detection capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">TF</span>
              </div>
              <h3 className="font-semibold mb-2">TensorFlow</h3>
              <p className="text-slate-400 text-sm">Deep learning framework for neural network models</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">CV</span>
              </div>
              <h3 className="font-semibold mb-2">OpenCV</h3>
              <p className="text-slate-400 text-sm">Computer vision library for image processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">SK</span>
              </div>
              <h3 className="font-semibold mb-2">Scikit-Image</h3>
              <p className="text-slate-400 text-sm">Image processing algorithms and analysis</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">NP</span>
              </div>
              <h3 className="font-semibold mb-2">NumPy</h3>
              <p className="text-slate-400 text-sm">Mathematical computing and array operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Thousands of Users Worldwide</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the power of professional AI detection technology developed by RootGroup.tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                Try AI Detection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
              onClick={() => window.open('https://rootgroup.tech/', '_blank')}
            >
              Visit RootGroup.tech
            </Button>
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