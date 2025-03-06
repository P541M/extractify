import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="Go to home page"
            >
              <div className="relative w-7 h-7 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/file.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Extract code from GitHub repositories with proper formatting for
              seamless AI analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/extract"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 10 4 15 9 20"></polyline>
                    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                  </svg>
                  Extract Code
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/P541M"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="mailto:videna.psalmeleazar@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2 text-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Links Section */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Extractify. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Privacy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Terms
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
