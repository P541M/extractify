import RepoItem from "./RepoItem";

interface Repo {
  id: string;
  url: string;
  starred: boolean;
  order?: number;
}

interface SidebarProps {
  sidebarOpen: boolean;
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
  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-0"
      } bg-gray-800 shadow-lg transition-all duration-300 overflow-hidden`}
    >
      <div className="p-4">
        {starredRepos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white mb-2">
              Starred Repositories
            </h3>
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

        <hr className="border-gray-600 my-4" />

        <div>
          <h3 className="text-sm font-semibold text-white mb-2">
            Recent Repositories
          </h3>
          <ul className="space-y-2">
            {repoList.map((repo) => (
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
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
