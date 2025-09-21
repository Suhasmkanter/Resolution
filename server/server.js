// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
//import helmet from 'helmet'; // Added for security headers
import rateLimit from 'express-rate-limit'; // Added for rate limiting

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import mediaRoutes from './src/routes/mediaRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure temp directory exists for file uploads
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Security: Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Security: Helmet for secure headers

//app.use(helmet({
//  contentSecurityPolicy: false // disable CSP for now
//}));


// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration (stricter: validate origin dynamically)
app.use(cors({
  origin: (origin, callback) => {
    // Allow Postman (no origin) and specified origins for testing
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? [process.env.FRONTEND_URL]
      : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', null];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Resolution Backend'
  });
});

// API Routes (validated paths)
try {
  app.use('/api/auth', authRoutes);

} catch (err) {
  console.error(err);
  
}
try {
  app.use('/auth', authRoutes);

} catch (err) {
  console.error(err);
  
}
app.use('/api/auth', authRoutes);
//app.use('/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// 404 handler (after all routes)
//app.use('/*', (req, res) => {
//  res.status(404).json({
//    success: false,
//    error: 'Route not found'
//  });
//});

// Global error handler (improved logging)
app.use((err, req, res, next) => {
  console.error(`Error at ${req.path}:`, err.stack);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File too large. Maximum size is 10MB.'
    });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      error: 'Unexpected file field. Use "file" as the field name.'
    });
  }
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resolution server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;
