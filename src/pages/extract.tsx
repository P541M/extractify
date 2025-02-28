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
import Sidebar from "../components/Sidebar";
import CodeExtractor from "../components/CodeExtractor";
import ProfileMenu from "../components/ProfileMenu";

interface GitTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

const DEBUG = process.env.DEBUG_LOGGING === "true";

export default function ExtractPage() {
  // State Variables
  const [repoUrl, setRepoUrl] = useState("");
  const [repoList, setRepoList] = useState<
    Array<{ id: string; url: string; starred: boolean }>
  >([]);
  const [starredRepos, setStarredRepos] = useState<
    Array<{ id: string; url: string; starred: boolean; order?: number }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [includeLineNumbers, setIncludeLineNumbers] = useState(false);
  const [autoExtract, setAutoExtract] = useState(false);
  const [openMenuRepoId, setOpenMenuRepoId] = useState<string | null>(null);
  const [draggedRepoIndex, setDraggedRepoIndex] = useState<number | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

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
        starred.sort((a, b) => (a.order || 0) - (b.order || 0));
        setStarredRepos(starred);
        setRepoList(recent);
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
      await handleRepoClick(repoUrl, true);
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
    if (!clickedRepo.starred) {
      const updatedRecent = repoList.filter((repo) => repo.url !== url);
      setRepoList([clickedRepo, ...updatedRecent]);
      try {
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
      setRepoUrl("");
      setOpenMenuRepoId(null);
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
        setRepoList((prev) => prev.filter((r) => r.id !== repo.id));
        setStarredRepos((prev) => [...prev, { ...repo, starred: true }]);
      } else {
        setStarredRepos((prev) => prev.filter((r) => r.id !== repo.id));
        setRepoList((prev) => [{ ...repo, starred: false }, ...prev]);
      }
      setOpenMenuRepoId(null);
    } catch (err: any) {
      console.error("Error updating star status:", err.message);
    }
  };

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

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Floating profile menu with settings */}
      <ProfileMenu
        session={session}
        includeLineNumbers={includeLineNumbers}
        autoExtract={autoExtract}
        updateSetting={updateSetting}
      />

      {/* If sidebar is closed, show a hamburger button to open it */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 text-gray-400 hover:text-primary transition-colors"
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        starredRepos={starredRepos}
        repoList={repoList}
        onRepoClick={handleRepoClick}
        onDeleteRepo={handleDeleteRepo}
        onToggleStar={toggleStar}
        openMenuRepoId={openMenuRepoId}
        setOpenMenuRepoId={setOpenMenuRepoId}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

      {/* Updated container for CodeExtractor with dynamic left margin */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <CodeExtractor
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          loading={loading}
          progress={progress}
          resultText={resultText}
          error={error}
          successMessage={successMessage}
          handleSubmit={handleSubmit}
          handleCopy={handleCopy}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  );
}
