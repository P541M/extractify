// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-semibold text-white">
            Extractify
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
                  className="text-muted hover:text-primary transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-muted hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-3xl animate-slide-up">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Discover Code with Extractify
          </h1>
          <p className="text-xl text-muted mb-8">
            Effortlessly extract and explore code from public GitHub
            repositories. Sign in with GitHub to get started!
          </p>
          {session ? (
            <Link
              href="/extract"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors text-lg"
            >
              Go to Extractor
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-colors text-lg"
            >
              Sign In with GitHub
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted">
          © {new Date().getFullYear()} Extractify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
