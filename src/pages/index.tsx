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
              <button
                onClick={() => signOut()}
                className="text-muted hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="text-muted hover:text-primary transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl animate-slide-up">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Welcome to Extractify
          </h1>
          <p className="text-lg text-muted mb-8">
            Extract and explore GitHub repositories with ease.
          </p>
          {session ? (
            <>
              <p className="text-muted mb-6">Hello, {session.user?.name}!</p>
              <Link
                href="/extract"
                className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors"
              >
                Start Extracting
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors"
            >
              Sign in with GitHub
            </button>
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
