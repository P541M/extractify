import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/file.svg"
                alt="Extractify Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Extractify
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/extract"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              Extract
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-primary to-blue-500 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-md font-medium"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* About Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Extractify
              </h1>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Extractify was born from a common developer challenge: the
                  need to quickly aggregate multiple files from a codebase to
                  share with AI assistants for analysis, debugging, and
                  improvements—without the tedious process of manually copying
                  each file.
                </p>
                <p className="text-lg leading-relaxed">
                  Our platform streamlines your workflow by automatically
                  extracting code from GitHub repositories with proper
                  formatting, including file names and paths, ready to be
                  analyzed by AI tools.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Our Mission
                </h2>
                <p className="text-gray-300">
                  To give developers back precious time by eliminating manual
                  file copying, allowing you to focus on what matters: writing
                  great code and getting meaningful AI assistance.
                </p>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  How It Works
                </h2>
                <p className="text-gray-300">
                  Connect with GitHub, select a repository, and with a single
                  click, Extractify formats your code with proper file names and
                  paths—perfect for pasting into AI assistants to get
                  comprehensive help.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Secure GitHub Integration
                    </h3>
                    <p className="text-gray-300">
                      OAuth authentication ensures secure access to your
                      repositories with proper permission scopes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      One-Click Extraction
                    </h3>
                    <p className="text-gray-300">
                      Extract all essential files from your repository with
                      proper structure in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Repository History
                    </h3>
                    <p className="text-gray-300">
                      Save and organize your frequently used repositories for
                      quick access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Customizable Output
                    </h3>
                    <p className="text-gray-300">
                      Include line numbers and control formatting options to
                      suit your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/20 p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Get Started Today
              </h2>
              <p className="text-gray-300 mb-6">
                Experience the ease of extracting code from repositories for AI
                analysis. Save time and focus on what matters most—building and
                improving your projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/extract"
                  className="bg-gradient-to-r from-primary to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg font-medium text-center"
                >
                  Try Extractify Now
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:shadow-lg font-medium text-center"
                >
                  Sign In with GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-5 h-5 mr-2">
                <Image
                  src="/file.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Terms
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Extractify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
