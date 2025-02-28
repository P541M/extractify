import React, { useState, useEffect } from "react";

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
}: CodeExtractorProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyWithFeedback = async () => {
    await handleCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className={`flex-1 flex flex-col items-center p-8 max-w-4xl mx-auto w-full ${
        mounted ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="w-full mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Code Extractor
        </h1>
        <p className="text-gray-300">
          Enter a GitHub repository URL to extract all the code files into a
          single document.
        </p>
      </div>

      <div className="w-full bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
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
                className="w-full p-3 pl-10 bg-gray-900 text-foreground rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="e.g., https://github.com/user/repo"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-70 flex items-center gap-2 font-medium shadow-md hover:shadow-primary/20 disabled:cursor-not-allowed"
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
            Public repositories work for all users. Private repositories require
            your GitHub account access.
          </p>
        </form>
      </div>

      {loading && (
        <div className="w-full mb-8 animate-fade-in bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">Extraction Progress</h3>
            <span className="text-sm font-medium text-primary">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-300"
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
              ? "Connecting to GitHub repository..."
              : progress < 60
              ? "Fetching repository files..."
              : progress < 90
              ? "Processing code files..."
              : "Finalizing extraction..."}
          </p>
        </div>
      )}

      {error && (
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

      {resultText && (
        <div className="w-full animate-fade-in bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-700">
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
                Extracted Code
              </h2>
              {successMessage && (
                <p className="text-sm text-green-400 mt-1 animate-fade-in">
                  {successMessage}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCopyWithFeedback}
                className={`${
                  copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
                } text-white px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center`}
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
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center"
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
            <pre className="w-full p-4 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 overflow-auto max-h-96 font-mono text-sm shadow-inner">
              {resultText}
            </pre>
          </div>
          <div className="bg-gray-900/50 px-6 py-3 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              This extracted code may be subject to the original repository's
              license and copyright terms.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
