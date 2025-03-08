import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Head from "next/head";
export default function LandingPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Head>
        <title>Extractify - Extract Code from Anywhere</title>
      </Head>
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-card overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10 animate-gradient"></div>
        </div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary/5 rounded-full blur-2xl"></div>
        <div
          className={`relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center ${
            mounted ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="lg:w-3/4 mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
              Extract Code from{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Anywhere
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Quickly extract and explore code from GitHub repositories or local
              project folders. Perfect for documentation, AI analysis, and
              sharing with teammates.
            </p>
            {session ? (
              <Link
                href="/extract"
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
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
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
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
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to extract and share code from any source
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card-hover rounded-xl p-8 shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-border-light group">
              <div className="w-14 h-14 bg-primary/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="Code Files"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                Flexible Code Extraction
              </h3>
              <p className="text-gray-300">
                Extract code from GitHub repositories or local project folders
                with just a few clicks. All with proper file formatting.
              </p>
            </div>
            <div className="bg-card-hover rounded-xl p-8 shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1 hover:border-border-light group">
              <div className="w-14 h-14 bg-secondary/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-secondary group-hover:scale-110">
                <Image
                  src="/globe.svg"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                Privacy First
              </h3>
              <p className="text-gray-300">
                Local files are processed entirely in your browser. No data is
                ever uploaded to our servers, keeping your code private.
              </p>
            </div>
            <div className="bg-card-hover rounded-xl p-8 shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 hover:border-border-light group">
              <div className="w-14 h-14 bg-accent/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                <Image
                  src="/window.svg"
                  alt="Output"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                AI-Ready Format
              </h3>
              <p className="text-gray-300">
                Code is formatted with filenames and paths, perfect for pasting
                into AI assistants for comprehensive analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary/5 to-transparent blur-3xl"></div>
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-block mb-6 p-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full">
            <div className="bg-card rounded-full px-4 py-1">
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
              className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            >
              Go to Extractor
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                Get Started for Free
              </Link>
              <p className="text-gray-400 text-sm">No credit card required</p>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
