import { useState, useEffect } from "react";
import RepoItem from "./RepoItem";

interface Repo {
  id: string;
  url: string;
  starred: boolean;
  order?: number;
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
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-0"
      } bg-gray-900 border-r border-gray-800 shadow-xl transition-all duration-300 overflow-hidden fixed h-full left-0 top-0 z-40`}
    >
      <div className="p-5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {sidebarOpen && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="ml-3 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="text-gray-400 hover:text-primary transition-colors"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {sidebarOpen && (
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-2 text-xs text-gray-500">
                REPOSITORIES
              </span>
            </div>
          </div>
        )}

        {sidebarOpen && (
          <>
            {starredRepos.length > 0 && (
              <div
                className={`${mounted ? "animate-fade-in" : "opacity-0"} mb-6`}
              >
                <div className="flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-400 mr-2"
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
              </div>
            )}

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
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
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
          </>
        )}
      </div>
    </aside>
  );
}
