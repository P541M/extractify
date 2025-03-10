# Extractify - Code Extraction Tool

Extractify is a web application that helps developers extract code from GitHub repositories and local projects with proper formatting for AI analysis, documentation, and collaboration.

## 🚀 Features

- **GitHub Repository Integration**: Connect with your GitHub account to extract code from any repository you have access to
- **Local File Processing**: Upload local project folders for code extraction without any data leaving your browser
- **Proper Code Formatting**: Extract code with file names, paths, and optional line numbers
- **Repository Management**: Star and organize repositories for quick access
- **Branch Selection**: Choose specific branches to extract code from
- **Secure Authentication**: OAuth integration with GitHub

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Authentication**: NextAuth.js with GitHub provider
- **Database**: Firebase Firestore
- **Styling**: TailwindCSS
- **API Integration**: Octokit (GitHub API)
- **TypeScript**: For type safety

## 📋 Project Structure

- `/src/components`: UI components
- `/src/pages`: Page components and API routes
- `/src/firebase`: Firebase configuration
- `/src/lib`: Utility functions
- `/src/styles`: Global styles
- `/src/types`: TypeScript type definitions
- `/public`: Static assets

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- GitHub OAuth App credentials
- Firebase project

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
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

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/extractify.git
   cd extractify
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## 📦 Key Components

- **CodeExtractor**: The main component for handling code extraction
- **LocalFileUploader**: Component for handling local file uploads and processing
- **Sidebar**: Navigation and repository management
- **BranchSelector**: Component for selecting repository branches
- **ProfileMenu**: User settings and profile management

## 🔄 API Routes

- `/api/auth/[...nextauth]`: NextAuth authentication endpoints
- `/api/extract`: Endpoint for extracting code from GitHub repositories
- `/api/branches`: Endpoint for fetching repository branches

## 🧩 Local File Processing

The application processes local files entirely in the browser:

1. Files are selected via the file system API
2. Processing happens in-memory using client-side JavaScript
3. No file data is ever transmitted to the server
4. Binary files and images are automatically detected and excluded

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚢 Deployment

This project is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## 🔒 Security Considerations

- GitHub OAuth tokens are securely handled via NextAuth.js
- Local file processing happens entirely client-side
- Repository access is verified before extraction

## 🧪 Future Improvements

- Add support for custom file exclusion patterns
- Implement GitLab and Bitbucket integration
- Add code analytics features
- Support custom extraction templates
- Improve extraction performance for large repositories