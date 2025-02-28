interface RepoItemProps {
  repo: { id: string; url: string; starred: boolean; order?: number };
  onClick: (url: string) => void;
  onMenuToggle: (repoId: string) => void;
  isMenuOpen: boolean;
  onToggleStar: (
    repo: { id: string; url: string; starred: boolean; order?: number },
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
          className="text-left text-gray-400 hover:text-blue-400 py-1 w-full"
          title={repo.url}
        >
          <span className="block overflow-hidden text-clip whitespace-nowrap">
            {repo.url.replace("https://github.com/", "")}
          </span>
        </button>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none"></div>
      </div>
      <div className="ml-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle(repo.id);
          }}
          className="p-1 text-gray-400 hover:text-blue-400 three-dot-button"
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
          <div className="absolute right-0 top-full mt-1 w-32 bg-gray-700 rounded-lg shadow-lg z-10 menu">
            {repo.starred ? (
              <button
                onClick={() => onToggleStar(repo, false)}
                className="w-full text-left text-gray-400 hover:text-blue-400 px-3 py-2 text-sm"
              >
                Unstar
              </button>
            ) : (
              <button
                onClick={() => onToggleStar(repo, true)}
                className="w-full text-left text-gray-400 hover:text-blue-400 px-3 py-2 text-sm"
              >
                Star
              </button>
            )}
            <button
              onClick={(e) => onDelete(e, repo.id, repo.url, repo.starred)}
              className="w-full text-left text-gray-400 hover:text-red-400 px-3 py-2 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
