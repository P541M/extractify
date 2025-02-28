// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
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
              href="/about"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              About
            </Link>
            {session ? (
              <>
                <Link
                  href="/extract"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Extract
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-md border border-gray-700 hover:border-gray-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-md font-medium"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10 animate-gradient"></div>
        </div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary/5 rounded-full blur-2xl"></div>

        <div
          className={`relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center ${
            mounted ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight animate-slide-up">
              Extract Code from GitHub{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Quickly extract and explore code from public or private GitHub
              repositories you have access to. Perfect for documentation,
              analysis, and sharing.
            </p>
            {session ? (
              <Link
                href="/extract"
                className="inline-flex items-center bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
              >
                <span>Start Extracting</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
              >
                <span>Sign In with GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
          {/* Rest of the hero section remains unchanged */}
          <div className="lg:w-1/2 relative">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="bg-gray-900 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-2 text-sm text-gray-300 font-medium">
                  Repository Code
                </div>
              </div>
              <div className="p-4 text-sm font-mono text-gray-300 overflow-hidden">
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    1
                  </span>
                  <span className="text-blue-400">import</span>
                  <span className="text-white"> React </span>
                  <span className="text-blue-400">from</span>
                  <span className="text-white"> </span>
                  <span className="text-green-400">'react'</span>
                  <span className="text-white">;</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    2
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    3
                  </span>
                  <span className="text-blue-400">function</span>
                  <span className="text-yellow-400"> ExtractCode</span>
                  <span className="text-white">() {`{`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    4
                  </span>
                  <span className="text-white pl-4">...</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    5
                  </span>
                  <span className="text-white pl-4">{`return (`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    6
                  </span>
                  <span className="text-white pl-8">{`<div>`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    7
                  </span>
                  <span className="text-white pl-12">{`<h1>Extract Code</h1>`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    8
                  </span>
                  <span className="text-white pl-8">{`</div>`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    9
                  </span>
                  <span className="text-white pl-4">{`);`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8 inline-block select-none">
                    10
                  </span>
                  <span className="text-white">{`}`}</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to extract and share code from GitHub
            repositories
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-gray-600 group">
              <div className="w-14 h-14 bg-primary/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <Image
                  src="/file.svg"
                  alt="Code Files"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                Code Extraction
              </h3>
              <p className="text-gray-300">
                Extract code from any repository you have access to with just a
                few clicks. Easy to use and incredibly fast.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1 hover:border-gray-600 group">
              <div className="w-14 h-14 bg-secondary/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-secondary group-hover:scale-110">
                <Image
                  src="/globe.svg"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                GitHub Integration
              </h3>
              <p className="text-gray-300">
                Seamless GitHub authentication for accessing both public and
                private repositories with secure OAuth flow.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 hover:border-gray-600 group">
              <div className="w-14 h-14 bg-accent/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                <Image
                  src="/window.svg"
                  alt="Output"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                Easy Export
              </h3>
              <p className="text-gray-300">
                Copy or download extracted code with a single click for easy
                sharing and collaboration with your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-background"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary/5 to-transparent blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-block mb-6 p-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full">
            <div className="bg-gray-900 rounded-full px-4 py-1">
              <span className="text-gray-300 text-sm font-medium">
                Join hundreds of developers
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Development?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join developers who use Extractify to improve their workflow and
            save time
          </p>
          {session ? (
            <Link
              href="/extract"
              className="inline-flex items-center bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            >
              Go to Extractor
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                Get Started for Free
              </Link>
              <p className="text-gray-400 text-sm">No credit card required</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative w-6 h-6 mr-2">
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
            <div className="flex space-x-8 mb-6 md:mb-0">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
            <div className="text-center md:text-right text-gray-400">
              <p>
                © {new Date().getFullYear()} Extractify. All rights reserved.
              </p>
              <p className="text-sm mt-1">Built with Next.js and TailwindCSS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
