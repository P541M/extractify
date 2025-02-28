import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TermsPage() {
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

      {/* Terms Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                By using Extractify, you agree to these terms governing your
                access to and use of our services. Please read them carefully.
              </p>

              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Service Usage
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Proper authorization required for all repository access
                  </li>
                  <li>Compliance with GitHub&apos; s Terms of Service</li>
                  <li>Non-commercial use unless enterprise agreement exists</li>
                  <li>Prohibition of automated bulk extraction</li>
                </ul>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Intellectual Property
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>You retain ownership of all extracted code</li>
                  <li>Extractify claims no rights to user-generated content</li>
                  <li>License grant for technical processing of your data</li>
                  <li>Responsibility for proper licensing of extracted code</li>
                </ul>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Limitations
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>AS-IS service without warranty</li>
                  <li>Limitation of liability for indirect damages</li>
                  <li>Right to terminate abusive accounts</li>
                  <li>Governing law: Ontario, Canada</li>
                </ul>
              </div>

              <p className="text-lg leading-relaxed">
                For enterprise agreements or compliance inquiries, contact
                <span className="text-primary"> legal@extractify.com</span>.
              </p>
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
