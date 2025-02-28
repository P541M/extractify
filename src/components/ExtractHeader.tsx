import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ExtractHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  session: any;
  showSettings: boolean;
  setShowSettings: (val: boolean) => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
  settingsRef: React.RefObject<HTMLDivElement>;
  includeLineNumbers: boolean;
  autoExtract: boolean;
  updateSetting: (
    key: "includeLineNumbers" | "autoExtract",
    value: boolean
  ) => void;
}

export default function ExtractHeader({
  sidebarOpen,
  toggleSidebar,
  session,
  showSettings,
  setShowSettings,
  toggleButtonRef,
  settingsRef,
  includeLineNumbers,
  autoExtract,
  updateSetting,
}: ExtractHeaderProps) {
  return (
    <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
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
          onClick={() => setShowSettings(!showSettings)}
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
              <span className="text-sm text-muted">Auto extract on click</span>
              <input
                type="checkbox"
                checked={autoExtract}
                onChange={(e) => updateSetting("autoExtract", e.target.checked)}
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
  );
}
