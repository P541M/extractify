// src/pages/login.tsx
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/extract");
    }
    setMounted(true);
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
          <p className="text-gray-300 mt-4 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-card shadow-lg border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
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
              href="/about"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div
          className={`relative p-8 bg-card rounded-xl shadow-2xl border border-border max-w-md w-full transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
              <Image
                src="/file.svg"
                alt="Extractify Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back</h1>
            <p className="text-gray-400">
              Sign in to access your Extractify account
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 blur-lg rounded-lg"></div>
              <button
                onClick={() => signIn("github", { callbackUrl: "/extract" })}
                className="w-full relative bg-background border border-border text-white px-6 py-4 rounded-lg font-medium hover:border-border-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex items-center justify-center group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 text-white"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
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
              </button>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>By continuing, you agree to Extractify&apos;s</p>
            <div className="flex justify-center space-x-2 mt-1">
              <Link
                href="/terms"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <span>&</span>
              <Link
                href="/privacy"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card py-6 border-t border-border">
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
