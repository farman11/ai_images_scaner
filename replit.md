# Overview

This is an AI Image Detection Checker application that allows users to upload images and determine whether they are AI-generated or real. The application features a React frontend with a Node.js/Express backend, using a PostgreSQL database for data persistence. Users can upload images through a modern web interface, receive real-time analysis results with confidence scores, and view detailed detection indicators that influenced the classification decision.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark mode)
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling and request logging
- **File Processing**: Multer for multipart file uploads with Sharp for image processing
- **Session Management**: Express sessions with PostgreSQL session store

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless PostgreSQL adapter for cloud database connectivity
- **Storage Strategy**: In-memory fallback storage for development with interface-based architecture for easy switching

## Authentication & Sessions
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Basic user registration and authentication system
- **Security**: Password hashing and secure session management

## AI Detection System
- **Enhanced Neural Networks**: Transfer learning with ResNet50 for deep learning-based AI detection
- **Hybrid Analysis**: Combines CNN deep learning with traditional computer vision forensics
- **Multi-Algorithm Detection**: 6 advanced algorithms including texture analysis, frequency domain, compression forensics
- **Processing Pipeline**: Multi-stage analysis including metadata extraction, noise pattern detection, and artifact identification
- **Result Structure**: Confidence scoring, classification labels, and detailed indicator reporting
- **Performance Tracking**: Processing time measurement and optimization

## Monetization System
- **Pre-Analysis Ad Modal**: Interactive modal displaying premium features and upgrade options before analysis
- **Timed Ad Experience**: 8-second countdown with premium service promotion
- **Premium Upselling**: Showcases batch processing, API access, and priority support features
- **Strategic Ad Placement**: Ads shown at optimal engagement moments (before analysis starts)

## Development Workflow
- **Build System**: Vite for frontend bundling with hot module replacement
- **Development Server**: Concurrent frontend and backend development with proxy setup
- **Production Build**: ESBuild for backend compilation and Vite for frontend optimization
- **Type Safety**: Shared TypeScript types between frontend and backend via shared schema

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle**: Type-safe ORM with PostgreSQL dialect support

## Image Processing
- **Sharp**: High-performance image processing for metadata extraction and format conversion
- **Multer**: Express middleware for handling multipart/form-data file uploads

## UI Framework
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Lucide React**: Consistent icon library with React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system

## Development Tools
- **Replit Integration**: Development environment with runtime error handling and debugging tools
- **Vite Plugins**: Development enhancement with error overlays and hot reloading
- **TypeScript**: Static type checking across the entire application stack

## State Management
- **TanStack Query**: Server state synchronization with caching and background updates
- **Wouter**: Minimalist client-side routing solution

## Session & Security
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express Session**: Server-side session management with secure cookie handling