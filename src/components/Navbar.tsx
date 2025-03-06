// src/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check active link
  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg"
          : "bg-card bg-opacity-90"
      } border-b ${scrolled ? "border-border/80" : "border-border"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className={`relative w-8 h-8 transition-all duration-500 ${
                  mounted ? "rotate-0" : "-rotate-90"
                } group-hover:scale-110`}
              >
                <Image
                  src="/file.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain drop-shadow-glow"
                />
              </div>
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated hamburger icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className={`relative text-base font-medium group ${
                isActive("/about")
                  ? "text-primary"
                  : "text-gray-300 hover:text-white"
              } transition-colors duration-200`}
            >
              About
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary transform transition-transform duration-300 ${
                  isActive("/about")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
            {session ? (
              <>
                <Link
                  href="/extract"
                  className={`relative text-base font-medium group ${
                    isActive("/extract")
                      ? "text-primary"
                      : "text-gray-300 hover:text-white"
                  } transition-colors duration-200`}
                >
                  Extract
                  <span
                    className={`absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary transform transition-transform duration-300 ${
                      isActive("/extract")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
                <div className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-px before:bg-border">
                  <button
                    onClick={() => signOut()}
                    className="bg-card-hover hover:bg-border text-white px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-md border border-border hover:border-border-light relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Out</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </>
            ) : (
              <div className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-px before:bg-border">
                <Link
                  href="/login"
                  className="relative inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 font-medium overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Sign In
                  </span>
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          ref={menuRef}
          className={`md:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-4 pt-4 pb-5 space-y-3 bg-card-hover rounded-xl mt-2 border border-border shadow-xl animate-fade-in">
            <Link
              href="/about"
              className={`flex items-center text-gray-300 hover:text-primary px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-background ${
                isActive("/about")
                  ? "bg-background text-primary border-l-2 border-primary pl-2.5"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </Link>
            {session ? (
              <>
                <Link
                  href="/extract"
                  className={`flex items-center text-gray-300 hover:text-primary px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-background ${
                    isActive("/extract")
                      ? "bg-background text-primary border-l-2 border-primary pl-2.5"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                  Extract
                </Link>
                <div className="pt-2 mt-2 border-t border-border">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center w-full text-gray-300 hover:text-white px-3 py-2.5 rounded-lg text-base font-medium hover:bg-border/60 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 mt-2 border-t border-border">
                <Link
                  href="/login"
                  className="flex items-center bg-gradient-to-r from-primary to-secondary text-white px-3 py-2.5 rounded-lg text-base font-medium hover:from-primary/90 hover:to-secondary/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
