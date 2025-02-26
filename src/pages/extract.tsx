// src/pages/extract.tsx
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import Link from "next/link";

export default function ExtractPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoList, setRepoList] = useState<Array<{ id: string; url: string }>>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const q = query(
          collection(db, "repositories"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const repos: Array<{ id: string; url: string }> = [];
        querySnapshot.forEach((doc) => {
          repos.push({ id: doc.id, url: doc.data().url });
        });
        setRepoList(repos);
      } catch (err: any) {
        console.error("Error fetching repos:", err.message);
      }
    };
    if (session) fetchRepos();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Redirect will handle this
  }

  const fetchRepo = async (url: string) => {
    setLoading(true);
    setError("");
    setResultText("");
    setProgress(0);

    try {
      // Simulate progress before actual API call
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          // Slowly increase progress up to 90%
          const newProgress = prevProgress + Math.random() * 5;
          return newProgress < 90 ? newProgress : 90;
        });
      }, 300);

      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url }),
        credentials: "include", // Ensure session cookie is sent
      });

      // Clear the interval and set progress to 100% when request completes
      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to fetch repository code.");
      } else {
        setResultText(data.code);
      }
    } catch (err: any) {
      setProgress(0);
      setError(err.message || "Something went wrong");
    }

    // Small delay before clearing loading state for smoother UX
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    // Check if repo already exists
    const existingRepo = repoList.find((repo) => repo.url === repoUrl);

    if (existingRepo) {
      // Move to top by clicking on it
      handleRepoClick(repoUrl);
    } else {
      try {
        const docRef = await addDoc(collection(db, "repositories"), {
          url: repoUrl,
          createdAt: new Date(),
        });
        // Add new repo to the top of the list
        setRepoList((prev) => [{ id: docRef.id, url: repoUrl }, ...prev]);
      } catch (err: any) {
        console.error("Error saving repo:", err.message);
      }
      await fetchRepo(repoUrl);
    }
  };

  const handleRepoClick = async (url: string) => {
    // Find repo by URL
    const clickedRepo = repoList.find((repo) => repo.url === url);
    if (!clickedRepo) return;

    // Remove the clicked repo from list
    const updatedList = repoList.filter((repo) => repo.url !== url);

    // Add it back to the top
    setRepoList([clickedRepo, ...updatedList]);

    // Update in Firestore: delete and create new to update timestamp
    try {
      // Delete existing document
      await deleteDoc(doc(db, "repositories", clickedRepo.id));

      // Create new document with current timestamp
      const docRef = await addDoc(collection(db, "repositories"), {
        url: url,
        createdAt: new Date(),
      });

      // Update the ID in our state
      setRepoList((prev) => [
        { id: docRef.id, url },
        ...prev.filter((repo) => repo.url !== url),
      ]);
    } catch (err: any) {
      console.error("Error updating repo order:", err.message);
    }

    // Set URL and fetch
    setRepoUrl(url);
    await fetchRepo(url);
  };

  const handleDeleteRepo = async (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string
  ) => {
    e.stopPropagation(); // Prevent triggering the parent click event

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "repositories", repoId));

      // Update state
      setRepoList((prev) => prev.filter((repo) => repo.id !== repoId));

      // If the currently selected repo was deleted, clear the input
      if (repoUrl === repoUrl) {
        setRepoUrl("");
      }
    } catch (err: any) {
      console.error("Error deleting repo:", err.message);
      setError("Failed to delete repository from history.");
    }
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } bg-gray-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden relative`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Repos</h2>
            <button
              onClick={toggleSidebar}
              className="text-muted hover:text-primary transition-colors p-2"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {/* X icon for closing sidebar */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {repoList.map((repo) => (
              <li key={repo.id} className="group">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleRepoClick(repo.url)}
                    className="flex-1 text-left text-muted hover:text-primary transition-colors truncate py-1"
                  >
                    {repo.url.replace("https://github.com/", "")}
                  </button>
                  <button
                    onClick={(e) => handleDeleteRepo(e, repo.id, repo.url)}
                    className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-all p-1"
                    aria-label="Delete repository"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="text-muted hover:text-primary transition-colors p-2"
                aria-label="Open sidebar"
              >
                {/* Hamburger icon when sidebar is closed */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
            <Link href="/" className="text-2xl font-semibold text-white">
              Extractify
            </Link>
          </div>
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
            {loading ? `Extracting... ${progress.toFixed(0)}%` : "Extract Code"}
          </button>
        </form>

        {loading && (
          <div className="mb-6 animate-fade-in">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-muted text-sm mt-2">
              {progress < 30
                ? "Initializing repository access..."
                : progress < 60
                ? "Fetching repository files..."
                : progress < 90
                ? "Processing code content..."
                : "Finalizing extraction..."}
            </p>
          </div>
        )}

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
