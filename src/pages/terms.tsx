// src/pages/terms.tsx
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
              href="/"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/extract"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              Extract
            </Link>
          </nav>
        </div>
      </header>

      {/* Terms Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-300 mb-4">
            By using Extractify, you agree to these Terms of Service. Please
            read them carefully.
          </p>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Use of Service
          </h2>
          <p className="text-gray-300 mb-4">
            You may use Extractify only for lawful purposes and in accordance
            with these terms. You agree not to use the service in any way that
            violates any applicable laws or regulations.
          </p>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Intellectual Property
          </h2>
          <p className="text-gray-300 mb-4">
            The content extracted from GitHub repositories remains the property
            of its respective owners. Extractify does not claim any ownership
            over the extracted code.
          </p>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Limitation of Liability
          </h2>
          <p className="text-gray-300 mb-4">
            Extractify is provided "as is" without any warranties. We are not
            liable for any damages arising from the use of this service.
          </p>
          <p className="text-gray-300">
            For more information, please contact us at terms@extractify.com.
          </p>
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
