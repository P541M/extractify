// src/pages/login.tsx
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /extract if already signed in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/extract");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-semibold text-white">
            Extractify
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-muted hover:text-primary transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md animate-slide-up">
          <h1 className="text-3xl font-bold mb-6 text-white">Sign In</h1>
          <p className="text-muted mb-8">
            Use your GitHub account to access Extractify.
          </p>
          <button
            onClick={() => signIn("github", { callbackUrl: "/extract" })}
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors"
          >
            Sign In with GitHub
          </button>
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
