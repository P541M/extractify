// src/pages/extract.tsx
import { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function ExtractPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoList, setRepoList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const q = query(collection(db, "repositories"), orderBy("createdAt"));
        const querySnapshot = await getDocs(q);
        const repos: string[] = [];
        querySnapshot.forEach((doc) => {
          repos.push(doc.data().url);
        });
        setRepoList(repos);
      } catch (err: any) {
        console.error("Error fetching repos:", err.message);
      }
    };
    fetchRepos();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-muted mb-6">Please sign in to continue.</p>
        <button
          onClick={() => signIn("github")}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  const fetchRepo = async (url: string) => {
    setLoading(true);
    setError("");
    setResultText("");
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to fetch repository code.");
      } else {
        setResultText(data.code);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl && !repoList.includes(repoUrl)) {
      try {
        await addDoc(collection(db, "repositories"), {
          url: repoUrl,
          createdAt: new Date(),
        });
        setRepoList((prev) => [...prev, repoUrl]);
      } catch (err: any) {
        console.error("Error saving repo:", err.message);
      }
    }
    await fetchRepo(repoUrl);
  };

  const handleRepoClick = async (url: string) => {
    setRepoUrl(url);
    await fetchRepo(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setSuccessMessage("Copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to copy code.");
    }
  };

  const handleDownload = () => {
    setSuccessMessage("Downloaded as code.txt!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Repos</h2>
        <ul className="space-y-2">
          {repoList.map((url, index) => (
            <li key={index}>
              <button
                onClick={() => handleRepoClick(url)}
                className="w-full text-left text-muted hover:text-primary transition-colors truncate"
              >
                {url.replace("https://github.com/", "")}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Extractify</h1>
          <button
            onClick={() => signOut()}
            className="text-muted hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-3 bg-gray-700 text-foreground rounded-xl border border-gray-600 focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter GitHub repo URL (e.g., https://github.com/user/repo)"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {loading ? "Extracting..." : "Extract Code"}
          </button>
        </form>

        {error && <p className="text-red-400 mb-4 animate-fade-in">{error}</p>}
        {resultText && (
          <div className="animate-slide-up">
            <h2 className="text-lg font-semibold text-white mb-3">
              Extracted Code
            </h2>
            <textarea
              readOnly
              value={resultText}
              rows={12}
              className="w-full p-4 bg-gray-700 text-foreground rounded-xl border border-gray-600 resize-none font-mono text-sm"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCopy}
                className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-green-400 transition-colors"
              >
                Copy
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  resultText
                )}`}
                download="code.txt"
                onClick={handleDownload}
                className="bg-accent text-white px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors"
              >
                Download
              </a>
            </div>
            {successMessage && (
              <p className="mt-3 text-secondary font-medium animate-fade-in">
                {successMessage}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
