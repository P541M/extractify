import { useState, useEffect, useRef } from "react";
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
} from "firebase/firestore";
import Link from "next/link";

export default function ExtractPage() {
  // Repository state
  const [repoUrl, setRepoUrl] = useState("");
  const [repoList, setRepoList] = useState<Array<{ id: string; url: string }>>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Set sidebarOpen to true by default
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Settings states
  const [includeLineNumbers, setIncludeLineNumbers] = useState(false);
  const [autoExtract, setAutoExtract] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const settingsRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedLineNumbers = localStorage.getItem("includeLineNumbers");
    const storedAutoExtract = localStorage.getItem("autoExtract");
    if (storedLineNumbers !== null) {
      setIncludeLineNumbers(storedLineNumbers === "true");
    }
    if (storedAutoExtract !== null) {
      setAutoExtract(storedAutoExtract === "true");
    }
  }, []);

  // Hide settings menu when clicking outside of the settings dropdown and toggle button
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
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
        querySnapshot.forEach((doc) =>
          repos.push({ id: doc.id, url: doc.data().url })
        );
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

  if (!session) return null;

  // Save a setting to localStorage and update state
  const updateSetting = (
    key: "includeLineNumbers" | "autoExtract",
    value: boolean
  ) => {
    localStorage.setItem(key, value.toString());
    if (key === "includeLineNumbers") setIncludeLineNumbers(value);
    if (key === "autoExtract") setAutoExtract(value);
  };

  const fetchRepo = async (url: string) => {
    setLoading(true);
    setError("");
    setResultText("");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 5, 90));
    }, 300);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url, includeLineNumbers }),
        credentials: "include",
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();
      if (!res.ok || data.error)
        setError(data.error || "Failed to fetch repository code.");
      else setResultText(data.code);
    } catch (err: any) {
      setProgress(0);
      setError(err.message || "Something went wrong");
    }
    setTimeout(() => setLoading(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    const existingRepo = repoList.find((repo) => repo.url === repoUrl);
    if (existingRepo) handleRepoClick(repoUrl);
    else {
      try {
        const docRef = await addDoc(collection(db, "repositories"), {
          url: repoUrl,
          createdAt: new Date(),
        });
        setRepoList((prev) => [{ id: docRef.id, url: repoUrl }, ...prev]);
      } catch (err: any) {
        console.error("Error saving repo:", err.message);
      }
      await fetchRepo(repoUrl);
    }
  };

  const handleRepoClick = async (url: string) => {
    const clickedRepo = repoList.find((repo) => repo.url === url);
    if (!clickedRepo) return;
    const updatedList = repoList.filter((repo) => repo.url !== url);
    setRepoList([clickedRepo, ...updatedList]);
    try {
      await deleteDoc(doc(db, "repositories", clickedRepo.id));
      const docRef = await addDoc(collection(db, "repositories"), {
        url: url,
        createdAt: new Date(),
      });
      setRepoList((prev) => [
        { id: docRef.id, url },
        ...prev.filter((repo) => repo.url !== url),
      ]);
    } catch (err: any) {
      console.error("Error updating repo order:", err.message);
    }
    setRepoUrl(url);
    // Auto extract only if enabled
    if (autoExtract) {
      await fetchRepo(url);
    }
  };

  const handleDeleteRepo = async (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string
  ) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "repositories", repoId));
      setRepoList((prev) => prev.filter((repo) => repo.id !== repoId));
      if (repoUrl === repoUrl) setRepoUrl("");
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

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-muted hover:text-primary transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
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
            )}
          </button>
          <Link href="/" className="text-xl font-semibold text-white">
            Extractify
          </Link>
        </div>
        <div className="relative">
          {/* Profile (Settings) icon as a toggle */}
          <button
            ref={toggleButtonRef}
            onClick={() => setShowSettings((prev) => !prev)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
            aria-label="Account settings"
          >
            <span className="text-white text-sm">A</span>
          </button>
          {showSettings && (
            <div
              ref={settingsRef}
              className="absolute right-0 mt-2 w-64 bg-gray-700 rounded-lg shadow-lg p-4 z-10"
            >
              <h3 className="text-white font-semibold mb-2">Settings</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">Include line numbers</span>
                <input
                  type="checkbox"
                  checked={includeLineNumbers}
                  onChange={(e) =>
                    updateSetting("includeLineNumbers", e.target.checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">
                  Auto extract on click
                </span>
                <input
                  type="checkbox"
                  checked={autoExtract}
                  onChange={(e) =>
                    updateSetting("autoExtract", e.target.checked)
                  }
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={() => signOut()}
                  className="w-full bg-secondary text-white px-3 py-2 rounded-lg hover:bg-green-400 transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } bg-gray-800 shadow-lg transition-all duration-300 overflow-hidden`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Recent Repos
            </h2>
            <ul className="space-y-2">
              {repoList.map((repo) => (
                <li
                  key={repo.id}
                  className="group flex justify-between items-center"
                >
                  <button
                    onClick={() => handleRepoClick(repo.url)}
                    className="flex-1 text-left text-muted hover:text-primary truncate py-1"
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
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 flex flex-col items-center p-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="w-full mb-6">
            <label htmlFor="repoUrl" className="block text-sm text-muted mb-2">
              Enter GitHub Repository URL (Public or Private)
            </label>
            <div className="flex gap-2">
              <input
                id="repoUrl"
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 p-3 bg-gray-700 text-foreground rounded-lg border border-gray-600 focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g., https://github.com/user/repo (private repos require access)"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
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
                ) : null}
                {loading ? "Extracting..." : "Extract"}
              </button>
            </div>
          </form>

          {loading && (
            <div className="w-full mb-6 animate-fade-in">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-muted text-sm mt-2">
                {progress < 30
                  ? "Connecting to GitHub..."
                  : progress < 60
                  ? "Fetching files..."
                  : "Processing..."}
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-400 mb-4 animate-fade-in w-full">{error}</p>
          )}

          {resultText && (
            <div className="w-full animate-slide-up bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-white">
                  Extracted Code
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="bg-secondary text-white px-3 py-1 rounded-lg hover:bg-green-400 transition-colors text-sm"
                  >
                    Copy
                  </button>
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                      resultText
                    )}`}
                    download="code.txt"
                    onClick={handleDownload}
                    className="bg-accent text-white px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
                  >
                    Download
                  </a>
                </div>
              </div>
              <pre className="w-full p-4 bg-gray-800 text-foreground rounded-lg border border-gray-600 overflow-auto max-h-96 font-mono text-sm">
                {resultText}
              </pre>
              {successMessage && (
                <p className="mt-3 text-secondary font-medium animate-fade-in">
                  {successMessage}
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
