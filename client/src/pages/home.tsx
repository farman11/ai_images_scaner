import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
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
  Microscope,
  Play,
  Pause
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

import GoogleAd from "@/components/GoogleAd";
import AdModal from "@/components/AdModal";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
      setIsAnalyzing(false);
      // Show Google Ad after analysis completes
      setTimeout(() => {
        setShowAd(true);
      }, 1500);
      toast({
        title: "Analysis Complete",
        description: `Image classified as ${data.classification} with ${data.confidence}% confidence`,
      });
    },
    onError: (error: Error) => {
      setIsAnalyzing(false);
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
    setShowAd(false);
    setShowAdModal(false);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startAnalysis = () => {
    if (!selectedFile) return;
    // Show ad modal first before starting analysis
    setShowAdModal(true);
  };

  const proceedWithAnalysis = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Eye className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Detection Checker</h1>
                <p className="text-sm text-slate-500">Verify image authenticity</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-medium">How it works</Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium">About</Link>
              <Link href="/faq" className="text-slate-600 hover:text-slate-900 font-medium">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            Detect AI-Generated Images
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload any image and our advanced multi-algorithm system will use texture analysis, frequency domain detection, compression forensics, statistical pattern recognition, and EXIF metadata examination to determine authenticity with professional accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
                <Upload className="mr-3 h-6 w-6 text-blue-600" />
                Upload Image
              </h3>
              
              <div
                className={`
                  border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                  transition-all duration-300 transform
                  ${selectedFile 
                    ? 'border-green-400 bg-green-50 scale-105' 
                    : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-105'
                  }
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                {!selectedFile ? (
                  <>
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <CloudUpload className="mx-auto h-12 w-12 mb-4 text-slate-400 hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-700 mb-2">
                      Drop your image here
                    </h4>
                    <p className="text-slate-500 mb-4">
                      or click to browse
                    </p>
                  </>
                ) : (
                  <>
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <CheckCircle className="mx-auto h-12 w-12 mb-4 text-green-500 transition-colors duration-300" />
                    </div>
                    <h4 className="text-lg font-medium text-green-700 mb-2">
                      Image Selected Successfully!
                    </h4>
                    <p className="text-green-600 mb-4">
                      Click to change or select a different image
                    </p>
                  </>
                )}
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
                <Button 
                  type="button" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Choose File
                </Button>
                <p className="text-xs text-slate-400 mt-3">Supports JPG, JPEG, PNG, WebP • Max 10MB</p>
              </div>

              {selectedFile && previewUrl && (
                <div className="mt-6 space-y-4">
                  {/* Image Preview */}
                  <div className="relative group">
                    <img 
                      src={previewUrl} 
                      alt="Selected image preview" 
                      className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-gray-200 transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-xl"
                      data-testid="image-preview"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Remove button overlay */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      data-testid="remove-image-button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* File Information Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[200px]" title={selectedFile.name}>
                            {selectedFile.name}
                          </p>
                          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <span>{formatFileSize(selectedFile.size)}</span>
                            <span>•</span>
                            <span className="capitalize">{selectedFile.type.split('/')[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={startAnalysis}
                disabled={!selectedFile || analyzeImageMutation.isPending}
                className={`
                  w-full mt-6 py-4 text-lg font-semibold 
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-700 hover:to-indigo-700
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                  disabled:hover:scale-100 disabled:hover:shadow-md disabled:opacity-50
                  ${isAnalyzing ? 'animate-pulse' : ''}
                  ${selectedFile ? 'ring-2 ring-blue-200 ring-offset-2' : ''}
                `}
                size="lg"
                data-testid="analyze-image-button"
              >
                {analyzeImageMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    <span className="animate-pulse">Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Microscope className="mr-3 h-5 w-5" />
                    {selectedFile ? 'Start AI Analysis' : 'Select Image First'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
                <Microscope className="mr-3 h-6 w-6 text-indigo-600" />
                Analysis Results
              </h3>
              
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
                      className="flex-1 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
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
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
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

        {/* Google Ads - Shows after analysis */}
        {showAd && analysisResult && (
          <div className="mt-8 animate-fade-in-up">
            <GoogleAd type="card" animated={true} />
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center group transform transition-all duration-500 hover:scale-105 animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300 hover-glow">
              <Zap className="text-blue-600 h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Fast Analysis</h3>
            <p className="text-slate-600">Get results in seconds with our optimized multi-algorithm system designed for speed and accuracy.</p>
          </div>
          <div className="text-center group transform transition-all duration-500 hover:scale-105 animate-fade-in-up delay-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-all duration-300 hover-glow">
              <Shield className="text-green-600 h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">Secure & Private</h3>
            <p className="text-slate-600">Your images are processed securely and are not stored on our servers after analysis.</p>
          </div>
          <div className="text-center group transform transition-all duration-500 hover:scale-105 animate-fade-in-up delay-400">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-yellow-500/20 group-hover:to-orange-500/20 transition-all duration-300 hover-glow">
              <TrendingUp className="text-yellow-500 h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">High Accuracy</h3>
            <p className="text-slate-600">Professional-grade accuracy with 6 advanced computer vision algorithms working together.</p>
          </div>
        </div>

        {/* How It Works */}
        <Card className="mt-16 shadow-2xl border-0 bg-white/70 backdrop-blur-sm hover-glow">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              How It Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center group animate-bounce-in">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Upload Image</h4>
                <p className="text-sm text-slate-600">Select and upload your image file in JPG, PNG, JPEG, or WebP format.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-200">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Multi-Algorithm Analysis</h4>
                <p className="text-sm text-slate-600">6 advanced computer vision algorithms analyze texture patterns, compression signatures, and metadata.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-400">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Get Results</h4>
                <p className="text-sm text-slate-600">Receive classification results with confidence score and detailed forensic indicators.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-600">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">4</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">Download Report</h4>
                <p className="text-sm text-slate-600">Optional detailed report with technical reasoning and computer vision analysis.</p>
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
              <p className="text-slate-400 mb-4">Developed by RootGroup.tech - Advanced AI-powered image authenticity verification for the modern digital world.</p>
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

      {/* Ad Modal */}
      <AdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onContinue={proceedWithAnalysis}
        analysisInProgress={isAnalyzing}
      />
    </div>
  );
}
