import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

interface ProfileMenuProps {
  session: {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
  includeLineNumbers: boolean;
  autoExtract: boolean;
  updateSetting: (
    key: "includeLineNumbers" | "autoExtract",
    value: boolean
  ) => void;
}

export default function ProfileMenu({
  session,
  includeLineNumbers,
  autoExtract,
  updateSetting,
}: ProfileMenuProps) {
  const [showSettings, setShowSettings] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          ref={toggleButtonRef}
          onClick={() => setShowSettings(!showSettings)}
          className="w-10 h-10 rounded-full border border-transparent hover:border-gray-400 transition-colors"
          aria-label="Account settings"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-white text-lg font-medium">
              {session?.user?.name?.charAt(0) || "A"}
            </span>
          )}
        </button>
        {showSettings && (
          <div
            ref={settingsRef}
            className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center">
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
                className="mr-2 text-primary"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <span className="text-sm text-white font-medium">
                    Include line numbers
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    Show line numbers with extracted code
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={includeLineNumbers}
                    onChange={(e) =>
                      updateSetting("includeLineNumbers", e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <span className="text-sm text-white font-medium">
                    Auto extract on click
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    Automatically extract code when clicking a file
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoExtract}
                    onChange={(e) =>
                      updateSetting("autoExtract", e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {session?.user?.name && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {session.user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={() => signOut()}
                className="w-full bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-primary/20 flex items-center justify-center space-x-2"
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
                  className="mr-1"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
