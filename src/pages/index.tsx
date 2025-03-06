import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function LandingPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  useEffect(() => {
    setMounted(true);
    // Animation cycle for GitHub integration visualization
    const animationInterval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(animationInterval);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
          className={`relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center ${
            mounted ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight animate-slide-up">
              Extract Code from GitHub{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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

          {/* GitHub Integration Visualization */}
          <div className="lg:w-1/2 relative">
            <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border transform transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="bg-background px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-2 text-sm text-gray-300 font-medium">
                  How it Works!
                </div>
              </div>
              <div className="p-6 relative h-72">
                {/* GitHub Logo */}
                {/* GitHub Logo */}
                <div
                  className={`absolute transition-all duration-700 ease-in-out ${
                    animationStep === 0 || animationStep === 3
                      ? "opacity-100 scale-100"
                      : "opacity-40 scale-95"
                  }`}
                  style={{ left: "20%", top: "15%" }}
                >
                  <svg
                    className="w-16 h-16 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div
                    className={`mt-2 text-center text-sm font-medium ${
                      animationStep === 0 || animationStep === 3
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    GitHub
                  </div>
                </div>
                {/* Extractify Logo */}
                <div
                  className={`absolute transition-all duration-700 ease-in-out ${
                    animationStep === 0 || animationStep === 3
                      ? "opacity-100 scale-100"
                      : "opacity-40 scale-95"
                  }`}
                  style={{ right: "20%", top: "15%" }}
                >
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-3">
                    <svg
                      className="w-10 h-10 text-white"
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
                  </div>
                  <div
                    className={`mt-2 text-center text-sm font-medium ${
                      animationStep === 0 || animationStep === 3
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    Extractify
                  </div>
                </div>
                {/* Connection Lines with improved viewBox and positioning */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* GitHub to Extractify Authentication Line */}
                  <path
                    className={`${
                      animationStep >= 1 ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                    d="M100 90 L300 90"
                    stroke="url(#auth-gradient)"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  />
                  {/* Data Flow - GitHub to Extractify */}
                  <path
                    className={`${
                      animationStep >= 2 ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                    d="M100 110 L300 110"
                    stroke="url(#data-gradient)"
                    strokeWidth="4"
                    strokeDasharray="8 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="24"
                      to="-24"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                  {/* Connection to User */}
                  <path
                    className={`${
                      animationStep >= 3 ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                    d="M300 130 L200 200 L100 130"
                    stroke="url(#output-gradient)"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="18"
                      to="-18"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                  {/* Gradients */}
                  <defs>
                    <linearGradient
                      id="auth-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient
                      id="data-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient
                      id="output-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* User Icon - better positioned */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${
                    animationStep === 3
                      ? "bottom-16 opacity-100 scale-100"
                      : "bottom-10 opacity-0 scale-90"
                  }`}
                >
                  <div className="bg-accent rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="mt-2 text-center text-sm font-medium text-accent">
                    You
                  </div>
                </div>
                {/* Animation step indicators - better positioned */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        animationStep === step ? "bg-primary" : "bg-gray-600"
                      }`}
                    ></div>
                  ))}
                </div>
                {/* Animation step descriptions with improved positioning and spacing */}
                <div className="absolute bottom-10 left-0 right-0 text-center h-6">
                  <div
                    className={`transition-all duration-300 ${
                      animationStep === 0
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <p className="text-sm text-gray-300">Connect with GitHub</p>
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      animationStep === 1
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <p className="text-sm text-gray-300">
                      Secure Authentication
                    </p>
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      animationStep === 2
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <p className="text-sm text-gray-300">
                      Extract Repository Code
                    </p>
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      animationStep === 3
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <p className="text-sm text-gray-300">Ready to Use!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
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
            Everything you need to extract and share code from GitHub
            repositories
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card-hover rounded-xl p-8 shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-border-light group">
              <div className="w-14 h-14 bg-primary/80 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <Image
                  src="/file.svg"
                  alt="Code Files"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert"
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
                GitHub Integration
              </h3>
              <p className="text-gray-300">
                Seamless GitHub authentication for accessing both public and
                private repositories with secure OAuth flow.
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
