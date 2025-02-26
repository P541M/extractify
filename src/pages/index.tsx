// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Enhanced header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/file.svg"
                alt="Extractify Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-semibold text-white">
              Extractify
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href="/extract"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Extract
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero section with gradient background */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-background"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
              Extract Code from GitHub{" "}
              <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Quickly extract and explore code from public or private GitHub
              repositories you have access to. Perfect for documentation,
              analysis, and sharing.
            </p>
            {session ? (
              <Link
                href="/extract"
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <span>Start Extracting</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
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
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <span>Sign In with GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
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
          <div className="lg:w-1/2 relative">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="bg-gray-700 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-2 text-sm text-gray-300">
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
            {/* Abstract code visualization elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/file.svg"
                  alt="Code Files"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Code Extraction
              </h3>
              <p className="text-gray-300">
                Extract code from any repository you have access to with just a
                few clicks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/globe.svg" alt="GitHub" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                GitHub Integration
              </h3>
              <p className="text-gray-300">
                Seamless GitHub authentication for accessing both public and
                private repositories.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/window.svg" alt="Output" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Easy Export
              </h3>
              <p className="text-gray-300">
                Copy or download extracted code with a single click for easy
                sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-tr from-background to-gray-800">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Streamline Your Development?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join developers who use Extractify to improve their workflow
          </p>
          {session ? (
            <Link
              href="/extract"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl"
            >
              Go to Extractor
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started for Free
            </Link>
          )}
        </div>
      </section>

      {/* Enhanced footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src="/file.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-white">
                Extractify
              </span>
            </div>
            <div className="text-center md:text-right text-muted">
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
