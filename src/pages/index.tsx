// src/pages/index.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to Extractify!
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Easily extract and explore your GitHub repositories.
      </p>
      <Link href="/extract">
        <a className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-600">
          Get Started
        </a>
      </Link>
    </div>
  );
}
