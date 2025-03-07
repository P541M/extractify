// src/components/SearchRepositories.tsx
import { useState, useEffect, useRef } from "react";

interface SearchRepositoriesProps {
  allRepos: Array<{
    id: string;
    url: string;
    starred: boolean;
    order?: number;
    hasAccess?: boolean;
  }>;
  onRepoClick: (url: string) => Promise<void>;
}

export default function SearchRepositories({
  allRepos,
  onRepoClick,
}: SearchRepositoriesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string;
      url: string;
      starred: boolean;
      order?: number;
      hasAccess?: boolean;
    }>
  >([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter repositories based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredRepos = allRepos.filter((repo) => {
      const repoName = repo.url
        .replace("https://github.com/", "")
        .toLowerCase();
      return repoName.includes(searchTerm.toLowerCase());
    });

    setSearchResults(filteredRepos);
  }, [searchTerm, allRepos]);

  // Handle clicks outside of search component to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleRepoSelect = (url: string) => {
    onRepoClick(url);
    setSearchTerm("");
    setIsSearchFocused(false);
  };

  const formatRepoUrl = (url: string) => {
    return url.replace("https://github.com/", "");
  };

  return (
    <div ref={searchRef} className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          className="w-full bg-background text-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results */}
      {isSearchFocused && searchResults.length > 0 && (
        <div className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-card-hover rounded-lg border border-border shadow-lg z-20">
          <ul className="py-1">
            {searchResults.map((repo) => (
              <li key={repo.id} className="px-2">
                <button
                  onClick={() => handleRepoSelect(repo.url)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md my-1 ${
                    repo.hasAccess === false
                      ? "text-red-400 hover:bg-background/50"
                      : "text-gray-300 hover:bg-background/50 hover:text-primary"
                  } transition-colors`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`h-4 w-4 mr-2 ${
                        repo.hasAccess === false
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    {formatRepoUrl(repo.url)}
                    {repo.starred && (
                      <svg
                        className="h-4 w-4 ml-2 text-accent"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {repo.hasAccess === false && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results Message */}
      {isSearchFocused && searchTerm && searchResults.length === 0 && (
        <div className="absolute w-full mt-2 bg-card-hover rounded-lg border border-border shadow-lg z-20 p-4 text-center">
          <p className="text-gray-400 text-sm">No repositories found</p>
        </div>
      )}
    </div>
  );
}
