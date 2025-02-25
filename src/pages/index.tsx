// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-900 text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold hover:text-primary transition-colors">
                Extractify
              </span>
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
          {/* Auth Buttons */}
          <div>
            {session ? (
              <button
                onClick={() => signOut()}
                className="hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="hover:text-primary transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="text-center mt-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Extractify!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Easily extract and explore your GitHub repositories.
          </p>
          {session ? (
            <div>
              <p className="text-gray-300 mb-4">
                Signed in as {session.user?.name}
              </p>
              <Link
                href="/extract"
                className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Sign in with GitHub
            </button>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          © {new Date().getFullYear()} Extractify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
