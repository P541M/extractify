interface RepoItemProps {
  repo: {
    id: string;
    url: string;
    starred: boolean;
    order?: number;
    hasAccess?: boolean; // New prop to track access status
  };
  onClick: (url: string) => void;
  onMenuToggle: (repoId: string) => void;
  isMenuOpen: boolean;
  onToggleStar: (
    repo: {
      id: string;
      url: string;
      starred: boolean;
      order?: number;
      hasAccess?: boolean;
    },
    newStarred: boolean
  ) => void;
  onDelete: (
    e: React.MouseEvent,
    repoId: string,
    repoUrl: string,
    starred: boolean
  ) => void;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop?: () => void;
}

export default function RepoItem({
  repo,
  onClick,
  onMenuToggle,
  isMenuOpen,
  onToggleStar,
  onDelete,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
}: RepoItemProps) {
  return (
    <li
      className="flex items-center relative"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {draggable && (
        <div
          className="w-4 h-8 flex items-center justify-center mr-2 cursor-move text-gray-400 hover:text-primary transition-colors"
          role="button"
          aria-label="Drag to reorder"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
      )}
      <div className="flex-1 relative overflow-hidden">
        <button
          onClick={() => onClick(repo.url)}
          className={`text-left py-1 w-full ${
            repo.hasAccess === false
              ? "text-red-400 hover:text-red-300"
              : "text-gray-400 hover:text-primary"
          }`}
          title={repo.url}
        >
          <div className="flex items-center repo-access-tooltip">
            <span className="block overflow-hidden text-clip whitespace-nowrap">
              {repo.url.replace("https://github.com/", "")}
            </span>
            {repo.hasAccess === false && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 flex-shrink-0"
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
                <div className="tooltip-text">
                  You don&apos;t have access to this repository. It may be
                  private or deleted.
                </div>
              </>
            )}
          </div>
        </button>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none"></div>
      </div>
      <div className="ml-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle(repo.id);
          }}
          className="p-1 text-gray-400 hover:text-primary three-dot-button"
          aria-label="More options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-card-hover rounded-lg shadow-lg z-10 menu border border-border">
            {repo.starred ? (
              <button
                onClick={() => onToggleStar(repo, false)}
                className="w-full text-left text-gray-400 hover:text-primary px-3 py-2 text-sm"
              >
                Unstar
              </button>
            ) : (
              <button
                onClick={() => onToggleStar(repo, true)}
                className="w-full text-left text-gray-400 hover:text-primary px-3 py-2 text-sm"
              >
                Star
              </button>
            )}
            <button
              onClick={(e) => onDelete(e, repo.id, repo.url, repo.starred)}
              className="w-full text-left text-gray-400 hover:text-red-400 px-3 py-2 text-sm border-t border-border"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
