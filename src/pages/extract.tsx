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

  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Load stored repositories from Firestore when the component mounts
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <p className="text-white mb-4">
          You must be signed in to use the extraction tool.
        </p>
        <button
          onClick={() => signIn("github")}
          className="text-white underline bg-primary px-6 py-3 rounded hover:bg-blue-600"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  // Function to fetch repo code from the API
  const fetchRepo = async (url: string) => {
    setLoading(true);
    setError("");
    setResultText("");
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  // Handle form submission by storing the repo URL and fetching code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl && !repoList.includes(repoUrl)) {
      try {
        // Save the repo URL to Firestore with a timestamp
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

  // Handle clicking a repo from the sidebar
  const handleRepoClick = async (url: string) => {
    setRepoUrl(url);
    await fetchRepo(url);
  };

  // Copy to clipboard function remains the same
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setSuccessMessage("Code copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to copy code.");
    }
  };

  // Download handler
  const handleDownload = () => {
    setSuccessMessage("Code downloaded as .txt!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar with stored repos */}
      <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Repositories</h2>
        <ul>
          {repoList.map((url, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleRepoClick(url)}
                className="text-left text-white hover:underline break-all"
              >
                {url}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main extraction area */}
      <main className="flex-1 p-8">
        <div className="flex justify-end mb-4">
          <button onClick={() => signOut()} className="text-white underline">
            Sign Out
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-foreground">Extractify</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2 text-foreground">
            Enter GitHub Repository URL:
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded mb-4 bg-gray-700 text-foreground"
            placeholder="https://github.com/owner/repo"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            {loading ? "Extracting..." : "Extract Code"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {resultText && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              Extracted Code
            </h2>
            <textarea
              readOnly
              value={resultText}
              rows={10}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-foreground"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCopy}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Copy Code
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  resultText
                )}`}
                download="code.txt"
                onClick={handleDownload}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download as .txt
              </a>
            </div>
            {successMessage && (
              <p className="mt-4 text-green-400 font-medium">
                {successMessage}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
