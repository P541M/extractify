# Extractify - Code Extraction Tool

A powerful full-stack web application that helps developers extract and share code from GitHub repositories and local projects. Built with modern web technologies, featuring GitHub OAuth integration, client-side file processing, and AI-ready code formatting for seamless documentation and collaboration workflows.

## Live Demo

**Frontend**: [Live Application](https://extractifycode.com) *(deployed on Vercel)*  
**API**: RESTful endpoints for GitHub integration and code extraction

## Features

- **GitHub Repository Integration**: Seamlessly connect with your GitHub account to extract code from any repository you have access to
- **Local File Processing**: Upload and process local project folders entirely in your browser - no data ever leaves your device
- **AI-Ready Code Formatting**: Extract code with proper file names, paths, and optional line numbers, perfectly formatted for AI analysis
- **Repository Management**: Star, organize, and quickly access your favorite repositories
- **Branch Selection**: Choose specific branches to extract code from with intelligent branch detection
- **Secure Authentication**: Robust OAuth integration with GitHub for secure access management
- **Privacy-First Architecture**: Local files are processed entirely client-side, ensuring complete data privacy
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progress Tracking**: Real-time progress indicators for large repository extractions

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and Server Components
- **React 19** - Modern UI library with concurrent features
- **TypeScript** - Type-safe development with full IDE support
- **Tailwind CSS** - Utility-first styling with custom design system
- **NextAuth.js** - Complete authentication solution

### Backend & Services
- **GitHub OAuth** - Secure repository access via GitHub API
- **Firebase Firestore** - NoSQL database for user preferences and starred repos
- **Octokit REST API** - GitHub API client for repository operations
- **Vercel** - Deployment platform with edge functions

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **TypeScript Config** - Strict type checking configuration

```
extractify/
├── public/                   # Static assets and icons
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CodeExtractor.tsx    # Main extraction interface
│   │   ├── LocalFileUploader.tsx # Client-side file processing
│   │   ├── BranchSelector.tsx   # Repository branch selection
│   │   └── SearchRepositories.tsx # GitHub repo search
│   ├── pages/              # Next.js pages and API routes
│   │   ├── api/            # Backend API endpoints
│   │   │   ├── auth/       # Authentication routes
│   │   │   ├── extract.ts  # Code extraction logic
│   │   │   └── branches.ts # Branch fetching
│   │   ├── extract.tsx     # Main extraction page
│   │   └── index.tsx       # Landing page
│   ├── firebase/           # Firebase configuration
│   ├── lib/                # Utility functions and API helpers
│   ├── styles/             # Global styles and Tailwind config
│   └── types/              # TypeScript type definitions
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- GitHub OAuth App credentials
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/extractify.git
   cd extractify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```bash
   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   # Debugging (optional)
   DEBUG_LOGGING=false
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Development Process & Challenges

### Key Technical Implementations
- **Hybrid Processing Architecture**: Designed dual-mode system supporting both GitHub API integration and client-side local file processing
- **Privacy-First Design**: Implemented complete client-side file processing ensuring no local data transmission
- **OAuth Security**: Integrated NextAuth.js with GitHub OAuth for secure repository access with proper token management
- **Real-time Progress Tracking**: Built comprehensive progress indicators for large repository extractions
- **Type Safety**: Comprehensive TypeScript integration with strict type checking across the entire application

### Problem-Solving Highlights
- **GitHub API Rate Limiting**: Implemented intelligent request batching and caching strategies
- **Large Repository Handling**: Optimized extraction algorithms for repositories with thousands of files
- **Cross-Browser Compatibility**: Ensured File System Access API fallbacks for broader browser support
- **Authentication State Management**: Seamless session handling with proper error boundaries
- **Binary File Detection**: Smart filtering to exclude non-text files during extraction

## Key Components

- **CodeExtractor**: Core component managing the extraction interface with progress tracking and error handling
- **LocalFileUploader**: Handles client-side file upload and processing with drag-and-drop support
- **BranchSelector**: Intelligent branch selection with real-time branch fetching from GitHub API
- **SearchRepositories**: Advanced repository search with filtering and pagination
- **Sidebar**: Navigation and repository management with starred repos functionality
- **ProfileMenu**: User settings and profile management with session handling

## API Architecture

- `/api/auth/[...nextauth]` - NextAuth authentication endpoints with GitHub OAuth
- `/api/extract` - Core extraction endpoint with progress streaming and error handling
- `/api/branches` - Repository branch fetching with caching optimization

## Local File Processing

The application features a privacy-first approach to local file processing:

1. **File System Access API**: Modern browser API for directory selection with fallback support
2. **In-Memory Processing**: All file processing happens client-side using JavaScript workers
3. **Zero Data Transmission**: No local file data ever leaves your browser or reaches our servers
4. **Smart File Filtering**: Automatic detection and exclusion of binary files, images, and build artifacts
5. **Progress Tracking**: Real-time progress indicators for large directory processing

## Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with advanced repository management
- **Tablet**: Touch-optimized controls with responsive navigation
- **Mobile**: Streamlined interface with essential extraction features

## Deployment

Optimized for modern deployment platforms:

**Vercel (Recommended):**
```bash
npm run build
```

**Other Platforms:**
- Netlify, Railway, or any Node.js hosting platform
- Docker support with included configuration
- Environment variable configuration for all major platforms

## Security & Privacy

- **OAuth Security**: GitHub tokens are securely managed through NextAuth.js with proper token rotation
- **Client-Side Processing**: Local files never leave your browser, ensuring complete privacy
- **Access Verification**: Repository permissions are verified before any extraction attempts
- **HTTPS Enforcement**: All communication is encrypted with strict transport security
- **No Data Logging**: User file contents and repository data are never logged or stored

## Future Enhancements

- [ ] Custom file exclusion patterns and .gitignore integration
- [ ] GitLab and Bitbucket platform support
- [ ] Advanced code analytics and repository insights
- [ ] Custom extraction templates and formatting options
- [ ] Bulk repository processing with queue management
- [ ] Code search and filtering within extracted content
- [ ] Integration with popular AI coding assistants
- [ ] Team collaboration features and shared repositories


## Let's Connect!

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yourprofile/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)

---

*Built with precision for developers who value privacy and efficiency*