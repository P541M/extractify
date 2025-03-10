// src/pages/index.tsx
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";

// Define types for CountUp component props
interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
}

// CountUp component for animated number counting
const CountUp = ({
  end,
  duration = 2,
  decimals = 0,
  separator = ",",
  prefix = "",
  suffix = "",
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  const formatNumber = (num: number) => {
    const fixed = parseFloat(num.toString()).toFixed(decimals);
    return (
      prefix +
      fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) +
      suffix
    );
  };
  return <>{formatNumber(count)}</>;
};

export default function LandingPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Structured data for search engines
  const structuredDataScript = {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Extractify",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Extract code from GitHub repositories and local projects with proper formatting for AI analysis and collaboration.",
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title="Extractify - Extract Code from Anywhere"
        description="Quickly extract and explore code from GitHub repositories or local project folders. Perfect for documentation, AI analysis, and sharing with teammates."
        canonicalUrl="https://extractifycode.com/"
      />
      {/* Additional structured data script for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredDataScript}
      />
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-card overflow-hidden min-h-[68vh] flex items-center">
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
                href="/extract/"
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
                href="/login/"
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
      {/* Stats Section - Now a standalone section */}
      <section className="py-16 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-gray-400 mt-2">
              Our platform helps developers streamline their workflow every day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-card p-6 rounded-xl border border-border shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
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
              <div className="text-3xl font-bold text-primary mb-2">
                <CountUp end={50000} duration={2.5} separator="," />+
              </div>
              <p className="text-gray-300">Files Extracted</p>
              <p className="text-gray-400 text-sm mt-2">
                Helping developers share their code efficiently
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:border-secondary/30 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-secondary mb-2">
                <CountUp end={150} duration={2} separator="," />+
              </div>
              <p className="text-gray-300">Happy Developers</p>
              <p className="text-gray-400 text-sm mt-2">
                Building better software with our tools
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">
                <CountUp end={95} duration={3} suffix="%" />
              </div>
              <p className="text-gray-300">Time Saved</p>
              <p className="text-gray-400 text-sm mt-2">
                Average time saved vs. manual code extraction
              </p>
            </div>
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
              href="/extract/"
              className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            >
              Go to Extractor
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                href="/login/"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                Get Started for Free
              </Link>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
