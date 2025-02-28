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
        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Extractify
            </h1>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Extractify is a developer tool designed to streamline your
                workflow by providing effortless code extraction from GitHub
                repositories. Whether you&apos; re documenting projects,
                analyzing codebases, or sharing snippets, our platform offers a
                seamless experience for both public and private repositories.
              </p>

              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Key Features
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    GitHub OAuth integration with fine-grained access control
                  </li>
                  <li>Smart code parsing with syntax preservation</li>
                  <li>
                    Customizable output formatting (line numbers, file
                    structure)
                  </li>
                  <li>Secure cloud storage for your extraction history</li>
                  <li>Cross-repository search and aggregation</li>
                </ul>
              </div>

              <div className="mt-8 border-t border-gray-700 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Our Philosophy
                </h2>
                <p className="text-lg leading-relaxed">
                  We believe in empowering developers with tools that enhance
                  productivity without compromising security. Extractify is
                  built with privacy-by-design principles, ensuring your code
                  remains yours throughout the process.
                </p>
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
