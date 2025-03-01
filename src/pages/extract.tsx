// src/pages/extract.tsx
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db, getUserRepositoriesCollection } from "../firebase/firebase";
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

export default function ExtractPage() {
  // State Variables
  const [repoUrl, setRepoUrl] = useState("");
  const [repoList, setRepoList] = useState<
    Array<{ id: string; url: string; starred: boolean; order?: number }>
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
  const [autoExtract, setAutoExtract] = useState(true);
  const [openMenuRepoId, setOpenMenuRepoId] = useState<string | null>(null);
  const [draggedRepoIndex, setDraggedRepoIndex] = useState<number | null>(null);
  // Branch-related state
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [loadingBranches, setLoadingBranches] = useState<boolean>(false);
  const [isAccessError, setIsAccessError] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Load persisted autoExtract preference from localStorage
  useEffect(() => {
    const storedAutoExtract = localStorage.getItem("autoExtract");
    if (storedAutoExtract !== null) {
      setAutoExtract(storedAutoExtract === "true");
    }
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!session?.githubUserId) {
        console.log("No GitHub user ID found in session", session);
        return;
      }

      try {
        console.log("Fetching repos for GitHub user ID:", session.githubUserId);
        // Get user-specific repositories collection
        const userReposCollectionName = getUserRepositoriesCollection(
          session.githubUserId
        );
        console.log("Collection name:", userReposCollectionName);
        const userReposCollectionRef = collection(db, userReposCollectionName);
        const q = query(userReposCollectionRef, orderBy("createdAt", "desc"));

        console.log("Executing Firestore query...");
        const querySnapshot = await getDocs(q);
        console.log("Query complete. Documents found:", querySnapshot.size);

        const starred: Array<{
          id: string;
          url: string;
          starred: boolean;
          order?: number;
          hasAccess?: boolean;
        }> = [];

        const recent: Array<{
          id: string;
          url: string;
          starred: boolean;
          order?: number;
          hasAccess?: boolean;
        }> = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const repo = {
            id: docSnap.id,
            url: data.url,
            starred: data.starred || false,
            order: data.order || 0,
            hasAccess: data.hasAccess !== undefined ? data.hasAccess : true, // Default to true if not specified
          };

          console.log("Found repository:", repo);
          if (repo.starred) {
            starred.push(repo);
          } else {
            recent.push(repo);
          }
        });

        starred.sort((a, b) => (a.order || 0) - (b.order || 0));
        setStarredRepos(starred);
        setRepoList(recent);

        console.log("Repositories loaded:", {
          starred: starred.length,
          recent: recent.length,
        });
      } catch (err: unknown) {
        console.error(
          "Error fetching repos:",
          err instanceof Error ? err.message : String(err)
        );
      }
    };

    if (session?.githubUserId) fetchRepos();
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

  // Function to fetch branches
  const fetchBranches = async (url: string) => {
    setLoadingBranches(true);
    try {
      const res = await fetch("/api/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        console.error(data.error || "Failed to fetch branches.");
        setBranches([]);
      } else {
        setBranches(data.branches || []);
        if (data.branches && data.branches.length > 0) {
          const preferredBranch = data.branches.includes("main")
            ? "main"
            : data.branches.includes("master")
            ? "master"
            : data.branches[0];
          setSelectedBranch(preferredBranch);
        }
      }
    } catch (err: unknown) {
      console.error(
        "Error fetching branches:",
        err instanceof Error ? err.message : String(err)
      );
      setBranches([]);
    }
    setLoadingBranches(false);
  };

  // Updated fetchRepo function to include branch parameter
  const fetchRepo = async (url: string, branch?: string) => {
    setLoading(true);
    setError("");
    setResultText("");
    setProgress(0);
    setIsAccessError(false); // Reset access error state

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 5, 90));
    }, 300);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoUrl: url,
          includeLineNumbers,
          branch: branch,
        }),
        credentials: "include",
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to fetch repository code.");

        // Check if this is an access error
        if (data.hasAccess === false) {
          setIsAccessError(true);
        }

        // Update the repo access status if provided in response
        if (data.hasAccess === false && session?.githubUserId) {
          // Find the repo in either starred or recent lists
          const repoInStarred = starredRepos.find((repo) => repo.url === url);
          const repoInRecent = repoList.find((repo) => repo.url === url);

          // Update the access status in Firebase and in state
          if (repoInStarred) {
            const userReposCollectionName = getUserRepositoriesCollection(
              session.githubUserId
            );
            await updateDoc(
              doc(db, userReposCollectionName, repoInStarred.id),
              {
                hasAccess: false,
              }
            );

            setStarredRepos((prevRepos) =>
              prevRepos.map((repo) =>
                repo.url === url ? { ...repo, hasAccess: false } : repo
              )
            );
          } else if (repoInRecent) {
            const userReposCollectionName = getUserRepositoriesCollection(
              session.githubUserId
            );
            await updateDoc(doc(db, userReposCollectionName, repoInRecent.id), {
              hasAccess: false,
            });

            setRepoList((prevRepos) =>
              prevRepos.map((repo) =>
                repo.url === url ? { ...repo, hasAccess: false } : repo
              )
            );
          }
        }
      } else {
        setResultText(data.code);

        // If we successfully accessed the repo, make sure its status reflects that
        if (data.hasAccess === true && session?.githubUserId) {
          // Find the repo in either starred or recent lists
          const repoInStarred = starredRepos.find((repo) => repo.url === url);
          const repoInRecent = repoList.find((repo) => repo.url === url);

          // Update the access status in Firebase and in state if needed
          if (repoInStarred && repoInStarred.hasAccess === false) {
            const userReposCollectionName = getUserRepositoriesCollection(
              session.githubUserId
            );
            await updateDoc(
              doc(db, userReposCollectionName, repoInStarred.id),
              {
                hasAccess: true,
              }
            );

            setStarredRepos((prevRepos) =>
              prevRepos.map((repo) =>
                repo.url === url ? { ...repo, hasAccess: true } : repo
              )
            );
          } else if (repoInRecent && repoInRecent.hasAccess === false) {
            const userReposCollectionName = getUserRepositoriesCollection(
              session.githubUserId
            );
            await updateDoc(doc(db, userReposCollectionName, repoInRecent.id), {
              hasAccess: true,
            });

            setRepoList((prevRepos) =>
              prevRepos.map((repo) =>
                repo.url === url ? { ...repo, hasAccess: true } : repo
              )
            );
          }
        }
      }
    } catch (err: unknown) {
      setProgress(0);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }

    setTimeout(() => setLoading(false), 500);
  };

  // Handle branch selection
  const handleBranchSelect = async (branch: string) => {
    setSelectedBranch(branch);
    await fetchRepo(repoUrl, branch);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl || !session.githubUserId) return;

    const existsInRecent = repoList.find((repo) => repo.url === repoUrl);
    const existsInStarred = starredRepos.find((repo) => repo.url === repoUrl);

    if (existsInRecent || existsInStarred) {
      await handleRepoClick(repoUrl, true);
    } else {
      try {
        console.log("Adding new repository:", repoUrl);
        console.log("GitHub User ID:", session.githubUserId);

        // Use user-specific collection
        const userReposCollectionName = getUserRepositoriesCollection(
          session.githubUserId
        );
        console.log("Collection name:", userReposCollectionName);

        const userReposCollectionRef = collection(db, userReposCollectionName);
        console.log("Adding document to collection...");

        // When adding a new repo in handleSubmit
        const newRepo = {
          url: repoUrl,
          createdAt: new Date(),
          starred: false,
          githubUserId: session.githubUserId,
          hasAccess: true, // Default to true until proven otherwise
        };

        console.log("Document data:", newRepo);

        const docRef = await addDoc(userReposCollectionRef, newRepo);
        console.log("Document added with ID:", docRef.id);

        setRepoList((prev) => [
          { id: docRef.id, url: repoUrl, starred: false, order: 0 },
          ...prev,
        ]);

        console.log("Repository added to state");
      } catch (err: unknown) {
        console.error(
          "Error saving repo:",
          err instanceof Error ? err.message : String(err)
        );
      }

      if (autoExtract) {
        await fetchRepo(repoUrl);
        await fetchBranches(repoUrl);
      }
    }
  };

  const handleRepoClick = async (url: string, forceFetch: boolean = false) => {
    const clickedRepo =
      repoList.find((repo) => repo.url === url) ||
      starredRepos.find((repo) => repo.url === url);

    if (!clickedRepo || !session.githubUserId) return;

    if (!clickedRepo.starred) {
      const updatedRecent = repoList.filter((repo) => repo.url !== url);
      setRepoList([clickedRepo, ...updatedRecent]);

      try {
        console.log("Updating repository order:", url);
        const userReposCollectionName = getUserRepositoriesCollection(
          session.githubUserId
        );

        // Delete the old document
        console.log("Deleting document:", clickedRepo.id);
        await deleteDoc(doc(db, userReposCollectionName, clickedRepo.id));

        // Add the new document
        console.log("Adding document with updated timestamp");
        const userReposCollectionRef = collection(db, userReposCollectionName);
        const docRef = await addDoc(userReposCollectionRef, {
          url: url,
          createdAt: new Date(),
          starred: clickedRepo.starred,
          order: clickedRepo.order || 0,
          githubUserId: session.githubUserId,
        });

        console.log("New document ID:", docRef.id);
        clickedRepo.id = docRef.id;
        setRepoList((prev) => [
          clickedRepo,
          ...prev.filter((repo) => repo.url !== url),
        ]);
      } catch (err: unknown) {
        console.error(
          "Error updating repo order:",
          err instanceof Error ? err.message : String(err)
        );
      }
    }

    setRepoUrl(url);
    if (forceFetch || autoExtract) {
      await fetchRepo(url);
      await fetchBranches(url);
    }
  };

  const handleDeleteRepo = async (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string,
    starred: boolean
  ) => {
    e.stopPropagation();
    if (!session.githubUserId) return;

    try {
      console.log("Deleting repository:", repoId);
      // Use user-specific collection
      const userReposCollectionName = getUserRepositoriesCollection(
        session.githubUserId
      );

      await deleteDoc(doc(db, userReposCollectionName, repoId));
      console.log("Repository deleted from Firestore");

      if (starred) {
        setStarredRepos((prev) => prev.filter((repo) => repo.id !== repoId));
      } else {
        setRepoList((prev) => prev.filter((repo) => repo.id !== repoId));
      }

      setRepoUrl("");
      setOpenMenuRepoId(null);
    } catch (err: unknown) {
      console.error(
        "Error deleting repo:",
        err instanceof Error ? err.message : String(err)
      );
      setError("Failed to delete repository from history.");
    }
  };

  const toggleStar = async (
    repo: { id: string; url: string; starred: boolean; order?: number },
    newStarred: boolean
  ) => {
    if (!session.githubUserId) return;

    try {
      console.log("Toggling star status:", { repo, newStarred });
      // Use user-specific collection
      const userReposCollectionName = getUserRepositoriesCollection(
        session.githubUserId
      );

      await updateDoc(doc(db, userReposCollectionName, repo.id), {
        starred: newStarred,
      });

      console.log("Star status updated in Firestore");

      if (newStarred) {
        setRepoList((prev) => prev.filter((r) => r.id !== repo.id));
        setStarredRepos((prev) => [...prev, { ...repo, starred: true }]);
      } else {
        setStarredRepos((prev) => prev.filter((r) => r.id !== repo.id));
        setRepoList((prev) => [{ ...repo, starred: false }, ...prev]);
      }

      setOpenMenuRepoId(null);
    } catch (err: unknown) {
      console.error(
        "Error updating star status:",
        err instanceof Error ? err.message : String(err)
      );
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedRepoIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number) => {
    if (draggedRepoIndex === null || !session.githubUserId) return;

    const updated = Array.from(starredRepos);
    const [moved] = updated.splice(draggedRepoIndex, 1);
    updated.splice(index, 0, moved);

    setStarredRepos(updated);
    setDraggedRepoIndex(null);

    // Update order in Firebase for each repo
    updated.forEach(async (repo, idx) => {
      try {
        console.log("Updating repo order:", { repo, newOrder: idx });
        const userReposCollectionName = getUserRepositoriesCollection(
          session.githubUserId
        );

        await updateDoc(doc(db, userReposCollectionName, repo.id), {
          order: idx,
        });
      } catch (err: unknown) {
        console.error(
          "Error updating repo order:",
          err instanceof Error ? err.message : String(err)
        );
      }
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setSuccessMessage("Copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      // No need to capture the error variable if we're not using it
      setError("Failed to copy code.");
    }
  };

  const handleDownload = () => {
    setSuccessMessage("Downloaded as code.txt!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex relative">
      <ProfileMenu
        // Fix the Session type issue using type casting
        // @ts-expect-error Session type incompatibility
        session={session}
        includeLineNumbers={includeLineNumbers}
        autoExtract={autoExtract}
        updateSetting={updateSetting}
      />
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
        onAddNewRepo={() => {
          setRepoUrl("");
          setResultText("");
          setBranches([]);
        }}
      />
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
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchSelect={handleBranchSelect}
          loadingBranches={loadingBranches}
          hasAccessError={isAccessError} // Pass the access error state
        />
      </div>
    </div>
  );
}
