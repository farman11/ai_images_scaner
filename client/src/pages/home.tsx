import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  Upload, 
  CloudUpload, 
  X, 
  Download, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Image as ImageIcon,
  Microscope
} from "lucide-react";

interface AnalysisResult {
  id: string;
  classification: string;
  confidence: number;
  processingTime: number;
  imageSize: string;
  indicators: Array<{
    name: string;
    strength: string;
  }>;
  filename: string;
  originalSize: number;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const analyzeImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Analysis failed');
      }
      
      return response.json();
    },
    onSuccess: (data: AnalysisResult) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: `Image classified as ${data.classification} with ${data.confidence}% confidence`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a JPG, JPEG, PNG, or WebP image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAnalysisResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = () => {
    if (!selectedFile) return;
    analyzeImageMutation.mutate(selectedFile);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "hsl(142, 76%, 36%)";
    if (confidence >= 70) return "hsl(45, 93%, 47%)";
    return "hsl(0, 84%, 60%)";
  };

  const getIndicatorIcon = (strength: string) => {
    switch (strength) {
      case 'Strong': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Moderate': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Weak': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getIndicatorColor = (strength: string) => {
    switch (strength) {
      case 'Strong': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Weak': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Eye className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">AI Detection Checker</h1>
                <p className="text-sm text-slate-500">Verify image authenticity</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">How it works</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">About</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Detect AI-Generated Images
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Upload any image and our advanced multi-algorithm system will use texture analysis, frequency domain detection, compression forensics, statistical pattern recognition, and EXIF metadata examination to determine authenticity with professional accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Upload Image</h3>
              
              <div
                className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center transition-colors hover:border-primary hover:bg-blue-50 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudUpload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h4 className="text-lg font-medium text-slate-700 mb-2">Drop your image here</h4>
                <p className="text-slate-500 mb-4">or click to browse</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
                <Button type="button">
                  Choose File
                </Button>
                <p className="text-xs text-slate-400 mt-3">Supports JPG, JPEG, PNG, WebP • Max 10MB</p>
              </div>

              {selectedFile && (
                <div className="mt-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ImageIcon className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-700">{selectedFile.name}</p>
                          <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={analyzeImage}
                disabled={!selectedFile || analyzeImageMutation.isPending}
                className="w-full mt-6 py-4 text-lg font-semibold"
                size="lg"
              >
                {analyzeImageMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Analysis Results</h3>
              
              {!analysisResult ? (
                <div className="text-center py-12">
                  <Microscope className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-lg">Upload an image to see analysis results</p>
                </div>
              ) : (
                <div>
                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="mb-6">
                      <img 
                        src={previewUrl} 
                        alt="Analyzed image" 
                        className="w-full h-48 object-cover rounded-lg shadow-sm" 
                      />
                    </div>
                  )}

                  {/* Classification Result */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-slate-700">Classification</h4>
                      <Badge 
                        variant={analysisResult.classification === 'Real Image' ? 'default' : 'destructive'}
                        className="px-3 py-1"
                      >
                        {analysisResult.classification}
                      </Badge>
                    </div>
                    
                    {/* Confidence Score */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600 font-medium">Confidence Score</span>
                        <span className="text-2xl font-bold text-slate-900">
                          {analysisResult.confidence}%
                        </span>
                      </div>
                      <Progress 
                        value={analysisResult.confidence} 
                        className="h-3"
                        style={{ 
                          backgroundColor: 'hsl(0, 0%, 90%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-700 mb-3">Analysis Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Processing Time</span>
                        <span className="font-medium text-slate-900">
                          {analysisResult.processingTime.toFixed(1)}s
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Image Size</span>
                        <span className="font-medium text-slate-900">
                          {analysisResult.imageSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Analysis Method</span>
                        <span className="font-medium text-slate-900">Multi-Algorithm CV</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Indicators */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-700 mb-3">Key Indicators</h4>
                    <div className="space-y-2">
                      {analysisResult.indicators.map((indicator, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getIndicatorIcon(indicator.strength)}
                            <span className="text-slate-700">{indicator.name}</span>
                          </div>
                          <span className={`text-sm font-medium ${getIndicatorColor(indicator.strength)}`}>
                            {indicator.strength}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Disclaimer */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Multi-Algorithm Analysis:</strong> Results from 6 advanced computer vision algorithms including 
                      Local Binary Patterns, GLCM texture analysis, frequency domain detection, compression forensics, 
                      and statistical pattern recognition. Professional-grade accuracy with multiple verification layers.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Download Report",
                          description: "Report download functionality would be implemented here",
                        });
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        removeFile();
                        setAnalysisResult(null);
                      }}
                    >
                      Analyze Another
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast Analysis</h3>
            <p className="text-slate-600">Get results in seconds with our optimized AI model designed for speed and accuracy.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure & Private</h3>
            <p className="text-slate-600">Your images are processed securely and are not stored on our servers after analysis.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-yellow-500 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">High Accuracy</h3>
            <p className="text-slate-600">Trained on millions of images with 95%+ accuracy rate in detecting AI-generated content.</p>
          </div>
        </div>

        {/* How It Works */}
        <Card className="mt-16 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
                <h4 className="font-semibold text-slate-900 mb-2">Upload Image</h4>
                <p className="text-sm text-slate-600">Select and upload your image file in JPG, PNG, or JPEG format.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
                <h4 className="font-semibold text-slate-900 mb-2">AI Analysis</h4>
                <p className="text-sm text-slate-600">Our CNN model analyzes pixel patterns, edges, and textures for AI signatures.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
                <h4 className="font-semibold text-slate-900 mb-2">Get Results</h4>
                <p className="text-sm text-slate-600">Receive classification results with confidence score and detailed analysis.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
                <h4 className="font-semibold text-slate-900 mb-2">Download Report</h4>
                <p className="text-sm text-slate-600">Optional detailed report with technical reasoning and feature analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Eye className="text-white h-4 w-4" />
                </div>
                <span className="text-xl font-bold">AI Detection Checker</span>
              </div>
              <p className="text-slate-400 mb-4">Advanced AI-powered image authenticity verification for the modern digital world.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white">Twitter</a>
                <a href="#" className="text-slate-400 hover:text-white">GitHub</a>
                <a href="#" className="text-slate-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AI Detection Checker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
