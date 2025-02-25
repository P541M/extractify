// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to Extractify!
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Easily extract and explore your GitHub repositories.
      </p>
      {session ? (
        <>
          <p className="text-gray-300 mb-8">
            Signed in as {session.user?.name}
          </p>
          <Link
            href="/extract"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Get Started
          </Link>
          <button
            onClick={() => signOut()}
            className="text-white underline mt-4"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Sign in with GitHub
        </button>
      )}
    </div>
  );
}
