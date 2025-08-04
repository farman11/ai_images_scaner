import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import sharp from "sharp";
import { z } from "zod";
import { insertImageAnalysisSchema } from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'));
    }
  },
});

// Mock AI classification function
function classifyImage(imageBuffer: Buffer, metadata: any): {
  classification: string;
  confidence: number;
  indicators: string[];
} {
  // Simulate AI analysis with realistic variations
  const isAI = Math.random() > 0.5;
  const baseConfidence = Math.random() * 0.3 + 0.7; // 70-100%
  
  const realIndicators = [
    'Natural noise patterns',
    'Camera sensor artifacts',
    'Compression consistency',
    'Lighting coherence',
    'Edge authenticity'
  ];
  
  const aiIndicators = [
    'Pixel uniformity',
    'Texture smoothness',
    'Edge perfection',
    'Lighting inconsistencies',
    'Compression anomalies'
  ];
  
  const selectedIndicators = isAI ? aiIndicators : realIndicators;
  const shuffledIndicators = selectedIndicators.sort(() => Math.random() - 0.5).slice(0, 3);
  
  return {
    classification: isAI ? 'AI Generated' : 'Real Image',
    confidence: Math.round(baseConfidence * 100),
    indicators: shuffledIndicators
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Image upload and analysis endpoint
  app.post('/api/analyze', upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const startTime = Date.now();
      
      // Process image with Sharp to get metadata and optimize
      const metadata = await sharp(req.file.buffer).metadata();
      
      if (!metadata.width || !metadata.height) {
        return res.status(400).json({ message: 'Invalid image file' });
      }

      // Simulate AI classification
      const classificationResult = classifyImage(req.file.buffer, metadata);
      
      const processingTime = (Date.now() - startTime) / 1000;
      
      // Create analysis record
      const analysisData = {
        filename: req.file.originalname,
        originalSize: req.file.size,
        dimensions: `${metadata.width}x${metadata.height}`,
        classification: classificationResult.classification,
        confidence: classificationResult.confidence,
        processingTime,
        indicators: classificationResult.indicators,
      };

      const analysis = await storage.createImageAnalysis(analysisData);

      res.json({
        id: analysis.id,
        classification: analysis.classification,
        confidence: analysis.confidence,
        processingTime: analysis.processingTime,
        imageSize: analysis.dimensions,
        indicators: analysis.indicators.map((indicator, index) => ({
          name: indicator,
          strength: ['Strong', 'Moderate', 'Weak'][index % 3]
        })),
        filename: analysis.filename,
        originalSize: analysis.originalSize
      });

    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to analyze image' 
      });
    }
  });

  // Get analysis by ID
  app.get('/api/analysis/:id', async (req: Request, res: Response) => {
    try {
      const analysis = await storage.getImageAnalysis(req.params.id);
      
      if (!analysis) {
        return res.status(404).json({ message: 'Analysis not found' });
      }

      res.json(analysis);
    } catch (error) {
      console.error('Get analysis error:', error);
      res.status(500).json({ message: 'Failed to retrieve analysis' });
    }
  });

  // Get recent analyses
  app.get('/api/analyses', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const analyses = await storage.getRecentAnalyses(limit);
      res.json(analyses);
    } catch (error) {
      console.error('Get analyses error:', error);
      res.status(500).json({ message: 'Failed to retrieve analyses' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
