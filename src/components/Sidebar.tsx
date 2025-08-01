// src/components/Sidebar.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import RepoItem from "./RepoItem";
import SearchRepositories from "./SearchRepositories";

interface Repo {
  id: string;
  url: string;
  starred: boolean;
  order?: number;
  hasAccess?: boolean; // Added new field
}

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  starredRepos: Repo[];
  repoList: Repo[];
  onRepoClick: (url: string, forceFetch?: boolean) => Promise<void>;
  onDeleteRepo: (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string,
    starred: boolean
  ) => void;
  onToggleStar: (repo: Repo, newStarred: boolean) => void;
  openMenuRepoId: string | null;
  setOpenMenuRepoId: (id: string | null) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (index: number) => void;
  onAddNewRepo: () => void;
}

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
  starredRepos,
  repoList,
  onRepoClick,
  onDeleteRepo,
  onToggleStar,
  openMenuRepoId,
  setOpenMenuRepoId,
  onDragStart,
  onDragOver,
  onDrop,
  onAddNewRepo,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combine starred and regular repos for search functionality
  const allRepos = [...starredRepos, ...repoList];

  return (
    <aside
      className={`w-64 bg-card border-r border-border shadow-xl transition-transform duration-300 fixed h-full left-0 top-0 z-50 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`flex flex-col h-full transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fixed Header Section */}
        <div className="p-5">
          {/* Sidebar Header with clickable logo */}
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </h2>
            </Link>
            <button
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="text-gray-400 hover:text-primary rounded-md p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Search Repositories Component */}
          <SearchRepositories allRepos={allRepos} onRepoClick={onRepoClick} />

          {/* Add New Repo Button */}
          <div className="mb-4">
            <button
              onClick={onAddNewRepo}
              className="w-full py-2 border border-border rounded-lg text-sm text-gray-400 hover:text-gray-300 hover:border-border-light transition-colors"
            >
              + Add New Repo
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-xs text-gray-500">
                REPOSITORIES
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Repository Sections - With Relative Wrapper for Fade Effects */}
        <div className="relative flex-1 overflow-hidden">
          {/* Top fade effect */}
          <div
            className="absolute top-0 left-0 h-8 bg-gradient-to-b from-card to-transparent pointer-events-none z-10"
            style={{ right: "10px" }}
          ></div>

          {/* Actual scrollable content */}
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background px-5 pb-5">
            {/* Starred Repositories */}
            <div
              className={`${
                mounted ? "animate-fade-in" : "opacity-0"
              } mb-6 pt-4`}
            >
              {starredRepos.length > 0 && (
                <>
                  <div className="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-accent mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-white">
                      Starred Repositories
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {starredRepos.map((repo, index) => (
                      <RepoItem
                        key={repo.id}
                        repo={repo}
                        onClick={(url) => onRepoClick(url)}
                        onMenuToggle={(id) =>
                          setOpenMenuRepoId(openMenuRepoId === id ? null : id)
                        }
                        isMenuOpen={openMenuRepoId === repo.id}
                        onToggleStar={onToggleStar}
                        onDelete={onDeleteRepo}
                        draggable={true}
                        onDragStart={() => onDragStart(index)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(index)}
                      />
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Recent Repositories */}
            <div className={`${mounted ? "animate-fade-in" : "opacity-0"}`}>
              <div className="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-white">
                  Recent Repositories
                </h3>
              </div>
              <ul className="space-y-2">
                {repoList.length > 0 ? (
                  repoList.map((repo) => (
                    <RepoItem
                      key={repo.id}
                      repo={repo}
                      onClick={(url) => onRepoClick(url)}
                      onMenuToggle={(id) =>
                        setOpenMenuRepoId(openMenuRepoId === id ? null : id)
                      }
                      isMenuOpen={openMenuRepoId === repo.id}
                      onToggleStar={onToggleStar}
                      onDelete={onDeleteRepo}
                    />
                  ))
                ) : (
                  <div className="text-center py-6 px-3">
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-gray-400 text-sm">
                        No recent repositories
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Repositories you visit will appear here
                      </p>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom fade effect */}
          <div
            className="absolute bottom-0 left-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none"
            style={{ right: "10px" }}
          ></div>
        </div>
      </div>
    </aside>
  );
}
