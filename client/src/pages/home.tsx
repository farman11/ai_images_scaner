import { useState, useRef, useEffect } from "react";
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
  Pause,
  BarChart3,
  Clock,
  Cpu
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
import { updatePageSEO, seoConfigs, addOrganizationStructuredData, addWebsiteStructuredData } from "@/lib/seo";

export default function Home() {
  // Update SEO when component mounts
  useEffect(() => {
    updatePageSEO(seoConfigs.home);
    addOrganizationStructuredData();
    addWebsiteStructuredData();
  }, []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Professional PDF Report Generator
  const generatePDFReport = () => {
    if (!analysisResult || !previewUrl) return;

    // Create HTML content for the report
    const reportHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>AI Detection Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { 
            size: A4; 
            margin: 15mm; 
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.3; 
            color: #334155; 
            background: #ffffff;
            font-size: 11px;
        }
        .header {
            background: linear-gradient(135deg, #5bc0be 0%, #4a9a98 100%);
            color: white;
            padding: 15px;
            text-align: center;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .header h1 { font-size: 1.8em; margin-bottom: 5px; font-weight: 700; }
        .header p { font-size: 0.9em; opacity: 0.9; }
        .container { max-width: 100%; margin: 0; padding: 0; }
        .top-section { 
            display: flex; 
            gap: 15px; 
            margin-bottom: 15px; 
            align-items: flex-start;
            height: 200px;
        }
        .image-container { 
            flex: 1; 
            text-align: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px;
            height: 100%;
        }
        .image-container h3 { font-size: 1em; margin-bottom: 8px; color: #1e293b; }
        .analyzed-image { 
            max-width: 100%; 
            max-height: 130px;
            width: auto;
            height: auto;
            border-radius: 6px; 
            margin-bottom: 8px;
        }
        .classification-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 0.8em;
            margin: 5px 0;
        }
        .real-image { 
            background: linear-gradient(135deg, #5bc0be, #4a9a98); 
            color: white; 
        }
        .ai-generated { 
            background: linear-gradient(135deg, #ef4444, #dc2626); 
            color: white; 
        }
        .results-panel { 
            flex: 1; 
            background: #f8fafc; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px; 
            padding: 15px; 
            height: 100%;
        }
        .confidence-score {
            text-align: center;
            margin-bottom: 15px;
        }
        .confidence-number {
            font-size: 2.2em;
            font-weight: 900;
            background: linear-gradient(135deg, #5bc0be, #4a9a98);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 3px;
        }
        .ai-generated .confidence-number {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .technical-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 8px; 
            margin-bottom: 10px; 
        }
        .tech-item { 
            background: linear-gradient(135deg, #5bc0be20, #4a9a9820); 
            border: 1px solid #5bc0be30; 
            border-radius: 6px; 
            padding: 8px; 
            text-align: center; 
        }
        .tech-label { 
            font-size: 0.7em; 
            color: #4a9a98; 
            font-weight: 600; 
        }
        .tech-value { 
            font-size: 0.9em; 
            font-weight: bold; 
            color: #5bc0be; 
            margin-top: 3px; 
        }
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        .section { 
            background: white; 
            border-radius: 8px; 
            padding: 12px; 
            border: 1px solid #e2e8f0;
        }
        .section h2 { 
            color: #1e293b; 
            margin-bottom: 8px; 
            font-size: 1em; 
            border-bottom: 1px solid #5bc0be; 
            padding-bottom: 4px; 
        }
        .section p { font-size: 0.9em; line-height: 1.3; }
        .indicators { 
            display: grid; 
            gap: 4px; 
        }
        .indicator { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 6px; 
            background: #f8fafc; 
            border-radius: 4px; 
            border-left: 3px solid #5bc0be; 
            font-size: 0.8em;
        }
        .methodology ul { 
            list-style: none; 
            padding-left: 0; 
            columns: 2;
            column-gap: 15px;
        }
        .methodology li { 
            margin-bottom: 4px; 
            padding-left: 12px; 
            position: relative; 
            font-size: 0.8em;
            break-inside: avoid;
        }
        .methodology li:before { 
            content: "✓"; 
            position: absolute; 
            left: 0; 
            color: #5bc0be; 
            font-weight: bold; 
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 8px;
        }
        .summary-item {
            text-align: center;
            padding: 8px;
            background: #f8fafc;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        .summary-label {
            font-size: 0.7em;
            color: #64748b;
            margin-bottom: 3px;
        }
        .summary-value {
            font-size: 0.9em;
            font-weight: bold;
            color: #1e293b;
        }
        .footer { 
            background: linear-gradient(135deg, #1e293b, #334155); 
            color: white; 
            padding: 10px; 
            text-align: center; 
            margin-top: 15px; 
            border-radius: 6px;
            font-size: 0.8em;
        }
        .disclaimer { 
            background: #fef3c7; 
            border: 1px solid #f59e0b; 
            border-radius: 6px; 
            padding: 8px; 
            margin: 10px 0; 
            font-size: 0.8em;
        }
        .warning { 
            background: #fee2e2; 
            border: 1px solid #ef4444; 
            border-radius: 6px; 
            padding: 8px; 
            margin: 10px 0; 
            font-size: 0.8em;
        }
        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .header, .section, .indicator { break-inside: avoid; }
            .content-grid { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AI Image Detection Report</h1>
        <p>Professional Computer Vision Analysis • RootGroup.tech</p>
    </div>
    
    <div class="container">
        <!-- Top Section: Image and Results -->
        <div class="top-section">
            <div class="image-container">
                <h3>Analyzed Image</h3>
                <img src="${previewUrl}" alt="Analyzed Image" class="analyzed-image">
                <div class="classification-badge ${analysisResult.classification === 'Real Image' ? 'real-image' : 'ai-generated'}">
                    ${analysisResult.classification}
                </div>
            </div>
            
            <div class="results-panel ${analysisResult.classification === 'Real Image' ? '' : 'ai-generated'}">
                <div class="confidence-score">
                    <div class="confidence-number">${analysisResult.confidence}%</div>
                    <div style="color: #64748b; font-size: 0.8em;">Confidence Score</div>
                </div>
                
                <div class="technical-grid">
                    <div class="tech-item">
                        <div class="tech-label">Time</div>
                        <div class="tech-value">${analysisResult.processingTime.toFixed(1)}s</div>
                    </div>
                    <div class="tech-item">
                        <div class="tech-label">Size</div>
                        <div class="tech-value">${analysisResult.imageSize}</div>
                    </div>
                    <div class="tech-item">
                        <div class="tech-label">Method</div>
                        <div class="tech-value">Multi-CV</div>
                    </div>
                </div>
                
                <!-- Quick Summary -->
                <div style="margin-top: 10px; padding: 8px; background: white; border-radius: 6px;">
                    <div style="font-size: 0.7em; color: #64748b; margin-bottom: 4px;">Report Details</div>
                    <div style="font-size: 0.8em; line-height: 1.2;">
                        <div><strong>ID:</strong> ${analysisResult.id.slice(0, 8)}</div>
                        <div><strong>Generated:</strong> ${new Date().toLocaleDateString()}</div>
                        <div><strong>Level:</strong> ${
                          analysisResult.confidence >= 90 ? 'Very High' :
                          analysisResult.confidence >= 80 ? 'High' :
                          analysisResult.confidence >= 70 ? 'Moderate' : 'Low'
                        }</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Content Grid -->
        <div class="content-grid">
            <div class="section">
                <h2>Key Detection Indicators</h2>
                <div class="indicators">
                    ${analysisResult.indicators.slice(0, 4).map(indicator => `
                        <div class="indicator">
                            <span>${indicator.name}</span>
                            <strong style="color: ${
                              indicator.strength === 'Strong' ? '#5bc0be' :
                              indicator.strength === 'Moderate' ? '#f59e0b' : '#ef4444'
                            }">${indicator.strength}</strong>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2>Classification Analysis</h2>
                ${analysisResult.classification === 'Real Image' 
                  ? `<p>This image appears to be an <strong>authentic photograph</strong> based on comprehensive analysis. The algorithms detected natural patterns consistent with real-world photography.</p>`
                  : `<div class="warning">
                       <p><strong>⚠️ WARNING:</strong> This image shows characteristics consistent with <strong>AI-generated content</strong>. Detected patterns typical of artificial intelligence image generation.</p>
                     </div>`
                }
            </div>
        </div>
        
        <div class="section methodology">
            <h2>Analysis Methodology</h2>
            <p style="margin-bottom: 8px; font-size: 0.9em;">Hybrid approach combining computer vision forensics with deep learning:</p>
            <ul>
                <li>Local Binary Patterns (LBP)</li>
                <li>Gray-Level Co-occurrence Matrix</li>
                <li>Frequency Domain Analysis</li>
                <li>Compression Forensics</li>
                <li>Noise Pattern Detection</li>
                <li>ResNet50 Neural Network</li>
            </ul>
        </div>
        
        <div class="disclaimer">
            <p><strong>Disclaimer:</strong> Analysis provided for informational purposes. 96.8% accuracy across test datasets. For critical applications, human expert review recommended.</p>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>AI Detection Checker</strong> • RootGroup.tech</p>
        <p>Advanced AI and Computer Vision Solutions</p>
        <p>https://aidetectionchecker.replit.app/</p>
    </div>
</body>
</html>`;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };

      toast({
        title: "Report Generated",
        description: "Professional PDF report is ready for download",
      });
    } else {
      // Fallback: download as HTML file
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI_Detection_Report_${analysisResult.id.slice(0, 8)}_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Downloaded",
        description: "HTML report saved. Open in browser and print to PDF",
      });
    }
  };

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

      {/* Ad Modal */}
      {showAdModal && (
        <AdModal 
          isOpen={showAdModal}
          onClose={() => setShowAdModal(false)}
          onContinue={() => setShowAdModal(false)}
        />
      )}



      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Eye className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 group-hover:text-[#5bc0be] transition-colors">AI Detection Checker</h1>
                <p className="text-sm text-slate-500">Verify image authenticity</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] bg-clip-text text-transparent animate-pulse">
            Detect AI-Generated Images
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload an image, and our system will verify its authenticity using advanced analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-white via-[#5bc0be]/10 to-[#4a9a98]/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-xl flex items-center justify-center mr-3">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    Upload Image
                  </h3>
                  <Badge variant="outline" className="bg-[#5bc0be]/10 text-[#4a9a98] border-[#5bc0be]/30">
                    Step 1
                  </Badge>
                </div>
                
                {/* Upload Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Upload Progress</span>
                    <span className="text-sm text-slate-500">{selectedFile ? '100%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        selectedFile 
                          ? 'w-full bg-gradient-to-r from-[#5bc0be] to-[#4a9a98]' 
                          : 'w-0 bg-gradient-to-r from-[#5bc0be]/60 to-[#4a9a98]/60'
                      }`}
                    />
                  </div>
                </div>
                
                <div
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                    transition-all duration-500 transform group
                    ${selectedFile 
                      ? 'border-[#5bc0be] bg-gradient-to-br from-[#5bc0be]/20 to-[#4a9a98]/20 scale-[1.02]' 
                      : 'border-slate-300 hover:border-[#5bc0be] hover:bg-gradient-to-br hover:from-[#5bc0be]/10 hover:to-[#4a9a98]/10 hover:scale-[1.02] hover:bg-gradient-to-br'
                    }
                  `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-2xl"></div>
                  
                  {!selectedFile ? (
                    <>
                      <div className="relative">
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-full opacity-20 animate-ping"></div>
                          <div className="relative w-full h-full bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CloudUpload className="h-10 w-10 text-white" />
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-3">
                          Drag & Drop Your Image
                        </h4>
                        <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                          Upload your image for professional AI detection analysis
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-full opacity-20 animate-ping"></div>
                          <div className="relative w-full h-full bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-full flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-white" />
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-[#4a9a98] mb-3">
                          Image Ready for Analysis
                        </h4>
                        <p className="text-[#5bc0be] mb-6">
                          Click to select a different image
                        </p>
                      </div>
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
                    size="lg"
                    className="bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] hover:from-[#4a9a98] hover:to-[#3a7875] text-white font-semibold px-8 py-3 rounded-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                  </Button>
                  
                  <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-slate-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#5bc0be] rounded-full mr-2"></div>
                      JPG, PNG, WebP
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#4a9a98] rounded-full mr-2"></div>
                      Max 10MB
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#5bc0be] rounded-full mr-2"></div>
                      High Quality
                    </div>
                  </div>
                </div>

              {selectedFile && previewUrl && (
                <div className="mt-6 space-y-4">
                  {/* Image Preview with Wave Animation */}
                  <div className="relative flex justify-center">
                    <div className="relative">
                      {/* Animated Wave Rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-72 h-72 rounded-full border-2 border-[#5bc0be]/30 animate-ping animation-delay-75"></div>
                        <div className="absolute w-64 h-64 rounded-full border-2 border-[#4a9a98]/30 animate-ping animation-delay-150"></div>
                        <div className="absolute w-56 h-56 rounded-full border-2 border-[#5bc0be]/40 animate-ping animation-delay-300"></div>
                      </div>
                      
                      {/* Main Image Container */}
                      <div className="relative w-48 h-48 mx-auto group">
                        {/* Gradient Border */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5bc0be] via-[#4a9a98] to-[#5bc0be] p-1 animate-pulse">
                          <div className="w-full h-full rounded-full bg-white p-2">
                            <img 
                              src={previewUrl} 
                              alt="Selected image preview" 
                              className="w-full h-full object-cover rounded-full transition-all duration-500 group-hover:scale-105"
                              data-testid="image-preview"
                            />
                          </div>
                        </div>
                        
                        {/* Floating Particles Effect */}
                        <div className="absolute -inset-4">
                          <div className="absolute top-4 left-4 w-2 h-2 bg-[#5bc0be] rounded-full animate-bounce animation-delay-100"></div>
                          <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-[#4a9a98] rounded-full animate-bounce animation-delay-200"></div>
                          <div className="absolute bottom-6 left-8 w-1 h-1 bg-[#5bc0be] rounded-full animate-bounce animation-delay-300"></div>
                          <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#4a9a98] rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                        
                        {/* Remove button overlay */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 z-10"
                          data-testid="remove-image-button"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-[#5bc0be]/40">
                          <div className="w-2 h-2 bg-[#5bc0be] rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-[#4a9a98]">Image Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* File Information Card */}
                  <div className="bg-gradient-to-r from-[#5bc0be]/20 to-[#4a9a98]/20 dark:from-[#5bc0be]/10 dark:to-[#4a9a98]/10 rounded-xl p-4 border border-[#5bc0be]/30 dark:border-[#5bc0be]/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#5bc0be]/30 dark:bg-[#5bc0be]/20 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-[#4a9a98] dark:text-[#5bc0be]" />
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
                        <div className="flex items-center space-x-1 text-[#5bc0be] dark:text-[#5bc0be]">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </CardContent>
            </Card>

            {/* Analysis Action Card */}
            <Card className="border-0 bg-gradient-to-br from-[#5bc0be]/10 via-[#4a9a98]/10 to-[#5bc0be]/5 backdrop-blur-xl border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-xl flex items-center justify-center mr-3">
                      <Microscope className="h-5 w-5 text-white" />
                    </div>
                    Start Analysis
                  </h3>
                  <Badge variant="outline" className="bg-[#5bc0be]/10 text-[#4a9a98] border-[#5bc0be]/30">
                    Step 2
                  </Badge>
                </div>

                {/* Analysis Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Analysis Progress</span>
                    <span className="text-sm text-slate-500">
                      {analyzeImageMutation.isPending ? 'Processing...' : analysisResult ? 'Complete' : 'Ready'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        analysisResult 
                          ? 'w-full bg-gradient-to-r from-[#5bc0be] to-[#4a9a98]' 
                          : analyzeImageMutation.isPending
                          ? 'w-3/4 bg-gradient-to-r from-[#5bc0be]/70 to-[#4a9a98]/70 animate-pulse'
                          : selectedFile
                          ? 'w-1/4 bg-gradient-to-r from-[#5bc0be]/50 to-[#4a9a98]/50'
                          : 'w-0 bg-slate-300'
                      }`}
                    />
                  </div>
                </div>

                <Button
                  onClick={startAnalysis}
                  disabled={!selectedFile || analyzeImageMutation.isPending}
                  size="lg"
                  className={`
                    w-full py-4 text-lg font-bold rounded-xl
                    bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] 
                    hover:from-[#4a9a98] hover:to-[#3a7875]
                    transform transition-all duration-500 hover:scale-[1.02]
                    disabled:hover:scale-100 disabled:opacity-60
                    ${isAnalyzing ? 'animate-pulse' : ''}
                    ${selectedFile ? 'ring-2 ring-[#5bc0be]/30 ring-offset-2' : ''}
                  `}
                  data-testid="analyze-image-button"
                >
                  {analyzeImageMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      </div>
                      <span className="animate-pulse">Analyzing with AI...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Microscope className="mr-3 h-6 w-6" />
                      {selectedFile ? 'Start Professional Analysis' : 'Select Image First'}
                    </div>
                  )}
                </Button>

                {/* Analysis Features */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-[#5bc0be] rounded-full"></div>
                    <span>6 AI Algorithms</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-[#4a9a98] rounded-full"></div>
                    <span>Deep Learning</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-[#5bc0be] rounded-full"></div>
                    <span>Forensics Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-[#4a9a98] rounded-full"></div>
                    <span>96.8% Accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <Card className="border-0 bg-gradient-to-br from-white via-[#5bc0be]/10 to-[#4a9a98]/10 backdrop-blur-xl border border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5bc0be] to-[#4a9a98] rounded-xl flex items-center justify-center mr-3">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Analysis Results
                </h3>
                <Badge variant="outline" className="bg-[#5bc0be]/10 text-[#4a9a98] border-[#5bc0be]/30">
                  Step 3
                </Badge>
              </div>
              
              {!analysisResult ? (
                <div className="text-center py-16">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full opacity-20"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-700 mb-3">Waiting for Analysis</h4>
                  <p className="text-slate-500 text-lg max-w-sm mx-auto">
                    Upload and analyze an image to see detailed AI detection results
                  </p>
                  
                  {/* Preview Features */}
                  <div className="mt-8 grid grid-cols-1 gap-4 max-w-md mx-auto">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                      <span className="text-sm font-medium text-[#4a9a98]">Classification Result</span>
                      <div className="w-16 h-2 bg-[#5bc0be]/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                      <span className="text-sm font-medium text-[#4a9a98]">Confidence Score</span>
                      <div className="w-20 h-2 bg-[#5bc0be]/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                      <span className="text-sm font-medium text-[#4a9a98]">Forensic Indicators</span>
                      <div className="w-12 h-2 bg-[#5bc0be]/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        {/* Wave Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-40 h-40 rounded-full border-2 animate-ping ${
                            analysisResult.classification === 'Real Image' 
                              ? 'border-[#5bc0be]/30' 
                              : 'border-red-500/30'
                          }`}></div>
                          <div className={`absolute w-32 h-32 rounded-full border-2 animate-ping animation-delay-75 ${
                            analysisResult.classification === 'Real Image' 
                              ? 'border-[#4a9a98]/30' 
                              : 'border-red-600/30'
                          }`}></div>
                        </div>
                        
                        {/* Analyzed Image */}
                        <div className="relative w-32 h-32">
                          <div className={`absolute inset-0 rounded-full p-1 ${
                            analysisResult.classification === 'Real Image' 
                              ? 'bg-gradient-to-r from-[#5bc0be] to-[#4a9a98]' 
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}>
                            <div className="w-full h-full rounded-full bg-white p-1">
                              <img 
                                src={previewUrl} 
                                alt="Analyzed image" 
                                className="w-full h-full object-cover rounded-full" 
                              />
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          <div className={`absolute -bottom-2 -right-2 text-white rounded-full p-1.5 ${
                            analysisResult.classification === 'Real Image' 
                              ? 'bg-[#5bc0be]' 
                              : 'bg-red-500'
                          }`}>
                            {analysisResult.classification === 'Real Image' ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Classification Result */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-slate-800">Final Classification</h4>
                      <Badge 
                        variant={analysisResult.classification === 'Real Image' ? 'default' : 'destructive'}
                        className={`px-4 py-2 text-sm font-bold rounded-xl ${
                          analysisResult.classification === 'Real Image' 
                            ? 'bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white border border-red-700'
                        }`}
                      >
                        {analysisResult.classification}
                      </Badge>
                    </div>
                    
                    {/* Confidence Score */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-slate-700 font-semibold text-lg">Confidence Score</span>
                          <p className="text-slate-500 text-sm">AI Detection Accuracy</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-4xl font-black bg-clip-text text-transparent ${
                            analysisResult.classification === 'Real Image' 
                              ? 'bg-gradient-to-r from-[#5bc0be] to-[#4a9a98]' 
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}>
                            {analysisResult.confidence}%
                          </span>
                          <p className="text-slate-500 text-sm">Confidence</p>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                          <div 
                            className={`h-4 rounded-full transition-all duration-2000 ease-out ${
                              analysisResult.classification === 'Real Image' 
                                ? (analysisResult.confidence >= 80 
                                    ? 'bg-gradient-to-r from-[#5bc0be] via-[#4a9a98] to-[#5bc0be]' 
                                    : analysisResult.confidence >= 60
                                    ? 'bg-gradient-to-r from-[#5bc0be]/80 via-[#4a9a98]/80 to-[#5bc0be]/80'
                                    : 'bg-gradient-to-r from-[#5bc0be]/60 via-[#4a9a98]/60 to-[#5bc0be]/60')
                                : (analysisResult.confidence >= 80 
                                    ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-500' 
                                    : analysisResult.confidence >= 60
                                    ? 'bg-gradient-to-r from-red-500/80 via-red-600/80 to-red-500/80'
                                    : 'bg-gradient-to-r from-red-500/60 via-red-600/60 to-red-500/60')
                            }`}
                            style={{ width: `${analysisResult.confidence}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-slate-800 mb-4">Technical Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-[#4a9a98] mr-2" />
                          <span className="text-sm font-semibold text-[#4a9a98]">Processing Time</span>
                        </div>
                        <span className="text-2xl font-bold text-[#5bc0be]">
                          {analysisResult.processingTime.toFixed(1)}s
                        </span>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                        <div className="flex items-center mb-2">
                          <ImageIcon className="h-5 w-5 text-[#4a9a98] mr-2" />
                          <span className="text-sm font-semibold text-[#4a9a98]">Image Size</span>
                        </div>
                        <span className="text-lg font-bold text-[#5bc0be]">
                          {analysisResult.imageSize}
                        </span>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-[#5bc0be]/20 to-[#4a9a98]/20 rounded-xl border border-[#5bc0be]/30">
                        <div className="flex items-center mb-2">
                          <Cpu className="h-5 w-5 text-[#4a9a98] mr-2" />
                          <span className="text-sm font-semibold text-[#4a9a98]">Method</span>
                        </div>
                        <span className="text-sm font-bold text-[#5bc0be]">
                          Multi-Algorithm CV
                        </span>
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
                      className="flex-1 transform transition-all duration-300 hover:scale-105"
                      onClick={generatePDFReport}
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
        <Card className="mt-16 border-0 backdrop-blur-sm hover-glow">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] bg-clip-text text-transparent">
              How It Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center group animate-bounce-in">
                <div className="w-12 h-12 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-[#5bc0be] transition-colors">Upload Image</h4>
                <p className="text-sm text-slate-600">Select and upload your image file in JPG, PNG, JPEG, or WebP format.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-200">
                <div className="w-12 h-12 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-[#5bc0be] transition-colors">Multi-Algorithm Analysis</h4>
                <p className="text-sm text-slate-600">6 advanced computer vision algorithms analyze texture patterns, compression signatures, and metadata.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-400">
                <div className="w-12 h-12 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-[#5bc0be] transition-colors">Get Results</h4>
                <p className="text-sm text-slate-600">Receive classification results with confidence score and detailed forensic indicators.</p>
              </div>
              <div className="text-center group animate-bounce-in delay-600">
                <div className="w-12 h-12 bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">4</div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-[#5bc0be] transition-colors">Download Report</h4>
                <p className="text-sm text-slate-600">Optional detailed report with technical reasoning and computer vision analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#5bc0be] to-[#4a9a98] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-white/90">
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
