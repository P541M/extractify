import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

interface ProfileMenuProps {
  session: any;
}

export default function ProfileMenu({ session }: ProfileMenuProps) {
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
          className="mt-2 w-72 bg-gray-800 rounded-xl shadow-lg p-5 z-50"
        >
          <h3 className="text-white font-semibold mb-4">Settings</h3>
          <div className="mb-4">
            <p className="text-sm text-white">
              Name: {session?.user?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-300">
              Email: {session?.user?.email || "N/A"}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
