// src/components/CodeExtractor.tsx (updated)
import React, { useState, useEffect } from "react";
import BranchSelector from "./BranchSelector";
import AccessDeniedError from "./AccessDeniedError";
import LocalFileUploader from "./LocalFileUploader";
import { useSession } from "next-auth/react";

interface CodeExtractorProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  loading: boolean;
  progress: number;
  resultText: string;
  error: string;
  successMessage: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCopy: () => Promise<void>;
  handleDownload: () => void;
  branches: string[];
  selectedBranch: string;
  onBranchSelect: (branch: string) => void;
  loadingBranches: boolean;
  hasAccessError?: boolean;
  // New props for local file handling
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setResultText: (text: string) => void;
  setError: (error: string) => void;
}

export default function CodeExtractor({
  repoUrl,
  setRepoUrl,
  loading,
  progress,
  resultText,
  error,
  successMessage,
  handleSubmit,
  handleCopy,
  handleDownload,
  branches,
  selectedBranch,
  onBranchSelect,
  loadingBranches,
  hasAccessError = false,
  // New props for local file handling
  setLoading,
  setProgress,
  setResultText,
  setError,
}: CodeExtractorProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"github" | "local">("github");
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyWithFeedback = async () => {
    await handleCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRepoName = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match && match[1] && match[2]) {
      const repoName = match[2].replace(/\.git$/, "");
      return `${match[1]}/${repoName}`;
    }
    return "Unknown Repo";
  };

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleLocalFilesProcessed = (resultText: string) => {
    setResultText(resultText);
    setError("");
  };

  return (
    <main
      className={`flex-1 flex flex-col items-center justify-center min-h-screen p-8 ${
        mounted ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
        {!resultText && !repoUrl && (
          <div className="w-full mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
              {getTimeBasedGreeting()}
              {session?.user?.name ? `, ${session.user.name}` : ""}!
            </h1>
            <p className="text-gray-300 text-center">
              Let&apos;s extract some code! Choose your extraction method below.
            </p>
          </div>
        )}

        {/* Tab selector */}
        <div className="w-full bg-card rounded-xl p-6 shadow-lg border border-border mb-8">
          <div className="flex space-x-1 bg-background rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab("github")}
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "github"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white hover:bg-border"
              }`}
            >
              <svg
                className="h-4 w-4 mr-2"
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
              GitHub Repository
            </button>
            <button
              onClick={() => setActiveTab("local")}
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "local"
                  ? "bg-secondary text-white"
                  : "text-gray-400 hover:text-white hover:bg-border"
              }`}
            >
              <svg
                className="h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 11V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V11M12 3V17M12 3L7 8M12 3L17 8"></path>
              </svg>
              Local Project
            </button>
          </div>

          {activeTab === "github" ? (
            <form onSubmit={handleSubmit} className="w-full">
              <label
                htmlFor="repoUrl"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                GitHub Repository URL
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                  </div>
                  <input
                    id="repoUrl"
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full p-3 pl-10 bg-background text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., https://github.com/user/repo"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all disabled:opacity-70 flex items-center gap-2 font-medium shadow-md hover:shadow-primary/20 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Extracting</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 10 4 15 9 20"></polyline>
                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                      </svg>
                      <span>Extract Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Extract code from any repository you have access to using your
                GitHub account.
              </p>
            </form>
          ) : (
            <div className="w-full">
              <LocalFileUploader
                onFilesProcessed={handleLocalFilesProcessed}
                setIsLoading={setLoading}
                setProgress={setProgress}
              />
              <p className="mt-2 text-sm text-gray-400">
                Extract code from local folders on your computer. Files are
                processed in your browser and not uploaded to our servers.
              </p>
            </div>
          )}
        </div>

        {loading && (
          <div className="w-full mb-8 animate-fade-in bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white">Extraction Progress</h3>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-3 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              {progress < 30
                ? activeTab === "github"
                  ? "Connecting to GitHub repository..."
                  : "Reading folder structure..."
                : progress < 60
                ? activeTab === "github"
                  ? "Fetching repository files..."
                  : "Processing files..."
                : progress < 90
                ? "Processing code files..."
                : "Finalizing extraction..."}
            </p>
          </div>
        )}

        {/* If it's an access error, show the special AccessDeniedError component */}
        {error && hasAccessError && (
          <AccessDeniedError repoUrl={repoUrl} errorMessage={error} />
        )}

        {/* For other types of errors, show the standard error display */}
        {error && !hasAccessError && (
          <div className="w-full mb-8 animate-fade-in bg-red-900/20 rounded-xl p-6 border border-red-700/50">
            <div className="flex items-start">
              <svg
                className="h-6 w-6 text-red-400 mr-3 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="font-medium text-red-400 mb-1">
                  Extraction Failed
                </h3>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Branch selector component - only shown for GitHub repos */}
        {branches.length > 1 &&
          resultText &&
          !loading &&
          activeTab === "github" && (
            <BranchSelector
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchSelect={onBranchSelect}
              isLoading={loadingBranches}
            />
          )}

        {resultText && (
          <div className="w-full animate-fade-in bg-card rounded-xl shadow-xl border border-border overflow-hidden">
            <div className="bg-background px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  {activeTab === "github" ? (
                    <>
                      Extracted Code ({getRepoName(repoUrl)}
                      {selectedBranch && ` - ${selectedBranch} branch`})
                    </>
                  ) : (
                    <>Extracted Code (Local Project)</>
                  )}
                </h2>
                {successMessage && (
                  <p className="text-sm text-green-400 mt-1 animate-fade-in">
                    {successMessage}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyWithFeedback}
                  className={`${
                    copied ? "bg-green-600" : "bg-card-hover hover:bg-border"
                  } text-white px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-center`}
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4 mr-1.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4 mr-1.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy Code
                    </>
                  )}
                </button>
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    resultText
                  )}`}
                  download="extracted-code.txt"
                  onClick={handleDownload}
                  className="bg-card-hover hover:bg-border text-white px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-center"
                >
                  <svg
                    className="h-4 w-4 mr-1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download
                </a>
              </div>
            </div>
            <div className="p-6">
              <pre className="w-full p-4 bg-background text-gray-300 rounded-lg border border-border overflow-auto max-h-96 font-mono text-sm shadow-inner">
                {resultText}
              </pre>
            </div>
            <div className="bg-background/50 px-6 py-3 border-t border-border">
              <p className="text-xs text-gray-400">
                {activeTab === "github"
                  ? "This extracted code may be subject to the original repository's license and copyright terms."
                  : "This extracted code is from your local files and was processed entirely in your browser."}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
