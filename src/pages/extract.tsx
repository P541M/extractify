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
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function ExtractPage() {
  // **State Variables**
  // Repository state
  const [repoUrl, setRepoUrl] = useState("");
  // Recent (non-starred) repositories
  const [repoList, setRepoList] = useState<
    Array<{ id: string; url: string; starred: boolean }>
  >([]);
  // Starred repositories
  const [starredRepos, setStarredRepos] = useState<
    Array<{ id: string; url: string; starred: boolean; order?: number }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default

  // Settings states
  const [includeLineNumbers, setIncludeLineNumbers] = useState(false);
  const [autoExtract, setAutoExtract] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // For drag-and-drop reordering of starred repos
  const [draggedRepoIndex, setDraggedRepoIndex] = useState<number | null>(null);

  // **Hooks and Refs**
  const { data: session, status } = useSession();
  const router = useRouter();
  const settingsRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // **Effects**
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

  // Hide settings menu when clicking outside
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Fetch repositories from Firebase
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const q = query(
          collection(db, "repositories"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const starred: Array<{
          id: string;
          url: string;
          starred: boolean;
          order?: number;
        }> = [];
        const recent: Array<{ id: string; url: string; starred: boolean }> = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const repo = {
            id: docSnap.id,
            url: data.url,
            starred: data.starred || false,
            order: data.order || 0,
          };
          if (repo.starred) {
            starred.push(repo);
          } else {
            recent.push(repo);
          }
        });
        // Optionally sort starred repos by order
        starred.sort((a, b) => (a.order || 0) - (b.order || 0));
        setStarredRepos(starred);
        setRepoList(recent);
      } catch (err: any) {
        console.error("Error fetching repos:", err.message);
      }
    };
    if (session) fetchRepos();
  }, [session]);

  // **Loading State Check**
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  // **Functions**

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
    const existsInRecent = repoList.find((repo) => repo.url === repoUrl);
    const existsInStarred = starredRepos.find((repo) => repo.url === repoUrl);
    if (existsInRecent || existsInStarred) {
      await handleRepoClick(repoUrl, true); // Always fetch when submitting
    } else {
      try {
        const docRef = await addDoc(collection(db, "repositories"), {
          url: repoUrl,
          createdAt: new Date(),
          starred: false,
        });
        setRepoList((prev) => [
          { id: docRef.id, url: repoUrl, starred: false },
          ...prev,
        ]);
      } catch (err: any) {
        console.error("Error saving repo:", err.message);
      }
      await fetchRepo(repoUrl);
    }
  };

  const handleRepoClick = async (url: string, forceFetch: boolean = false) => {
    let clickedRepo =
      repoList.find((repo) => repo.url === url) ||
      starredRepos.find((repo) => repo.url === url);
    if (!clickedRepo) return;
    // For non-starred repos, auto-move to top by reordering the list
    if (!clickedRepo.starred) {
      const updatedRecent = repoList.filter((repo) => repo.url !== url);
      setRepoList([clickedRepo, ...updatedRecent]);
      try {
        // Remove and re-add the repo to update its createdAt timestamp.
        await deleteDoc(doc(db, "repositories", clickedRepo.id));
        const docRef = await addDoc(collection(db, "repositories"), {
          url: url,
          createdAt: new Date(),
          starred: clickedRepo.starred,
          order: clickedRepo.order || 0,
        });
        clickedRepo.id = docRef.id;
        setRepoList((prev) => [
          clickedRepo,
          ...prev.filter((repo) => repo.url !== url),
        ]);
      } catch (err: any) {
        console.error("Error updating repo order:", err.message);
      }
    }
    // For starred repos, leave order unchanged.
    setRepoUrl(url);
    if (forceFetch || autoExtract) {
      await fetchRepo(url);
    }
  };

  const handleDeleteRepo = async (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string,
    starred: boolean
  ) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "repositories", repoId));
      if (starred) {
        setStarredRepos((prev) => prev.filter((repo) => repo.id !== repoId));
      } else {
        setRepoList((prev) => prev.filter((repo) => repo.id !== repoId));
      }
      if (repoUrl === repoUrl) setRepoUrl("");
    } catch (err: any) {
      console.error("Error deleting repo:", err.message);
      setError("Failed to delete repository from history.");
    }
  };

  const toggleStar = async (
    repo: { id: string; url: string; starred: boolean; order?: number },
    newStarred: boolean
  ) => {
    try {
      await updateDoc(doc(db, "repositories", repo.id), {
        starred: newStarred,
      });
      if (newStarred) {
        // Remove from recent and add to starred (append to end)
        setRepoList((prev) => prev.filter((r) => r.id !== repo.id));
        setStarredRepos((prev) => [...prev, { ...repo, starred: true }]);
      } else {
        // Remove from starred and add to recent (prepend)
        setStarredRepos((prev) => prev.filter((r) => r.id !== repo.id));
        setRepoList((prev) => [{ ...repo, starred: false }, ...prev]);
      }
    } catch (err: any) {
      console.error("Error updating star status:", err.message);
    }
  };

  // Drag and drop handlers for starred repos
  const handleDragStart = (index: number) => {
    setDraggedRepoIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number) => {
    if (draggedRepoIndex === null) return;
    const updated = Array.from(starredRepos);
    const [moved] = updated.splice(draggedRepoIndex, 1);
    updated.splice(index, 0, moved);
    setStarredRepos(updated);
    setDraggedRepoIndex(null);
    // Update order in Firestore for each repo (optional)
    updated.forEach(async (repo, idx) => {
      try {
        await updateDoc(doc(db, "repositories", repo.id), { order: idx });
      } catch (err: any) {
        console.error("Error updating repo order:", err.message);
      }
    });
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

  // **Render**
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Header */}
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
          <button
            ref={toggleButtonRef}
            onClick={() => setShowSettings((prev) => !prev)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors overflow-hidden"
            aria-label="Account settings"
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <span className="text-white text-sm">A</span>
            )}
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
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } bg-gray-800 shadow-lg transition-all duration-300 overflow-hidden`}
        >
          <div className="p-4">
            {/* Starred Repos Section */}
            {starredRepos.length > 0 && (
              <>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Starred Repos
                </h2>
                <ul className="space-y-2 mb-4">
                  {starredRepos.map((repo, index) => (
                    <li
                      key={repo.id}
                      className="group flex justify-between items-center bg-gray-700 p-2 rounded cursor-move"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                    >
                      <button
                        onClick={() => handleRepoClick(repo.url)}
                        className="flex-1 text-left text-muted hover:text-primary truncate py-1"
                      >
                        {repo.url.replace("https://github.com/", "")}
                      </button>
                      <div className="flex gap-2 items-center">
                        {/* Unstar button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(repo, false);
                          }}
                          className="text-yellow-400 hover:text-yellow-500"
                          aria-label="Unstar repository"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Recent Repos Section */}
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
                  <div className="flex gap-2 items-center">
                    {/* Star button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(repo, true);
                      }}
                      className="text-muted hover:text-yellow-400 transition-all p-1"
                      aria-label="Star repository"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) =>
                        handleDeleteRepo(e, repo.id, repo.url, repo.starred)
                      }
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

        {/* Main Content */}
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
