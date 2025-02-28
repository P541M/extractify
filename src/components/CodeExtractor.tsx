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
  return (
    <main className="flex-1 flex flex-col items-center p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full mb-6">
        <label htmlFor="repoUrl" className="block text-sm text-muted mb-2">
          Enter GitHub Repository URL (Public or Private)
        </label>
        <div className="flex gap-2">
          <input
            id="repoUrl"
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="flex-1 p-3 bg-gray-700 text-foreground rounded-lg border border-gray-600 focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., https://github.com/user/repo (private repos require access)"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
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
            ) : null}
            {loading ? "Extracting..." : "Extract"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="w-full mb-6 animate-fade-in">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-muted text-sm mt-2">
            {progress < 30
              ? "Connecting to GitHub..."
              : progress < 60
              ? "Fetching files..."
              : "Processing..."}
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-400 mb-4 animate-fade-in w-full">{error}</p>
      )}

      {resultText && (
        <div className="w-full animate-slide-up bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">Extracted Code</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="bg-secondary text-white px-3 py-1 rounded-lg hover:bg-green-400 transition-colors text-sm"
              >
                Copy
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  resultText
                )}`}
                download="code.txt"
                onClick={handleDownload}
                className="bg-accent text-white px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
              >
                Download
              </a>
            </div>
          </div>
          <pre className="w-full p-4 bg-gray-800 text-foreground rounded-lg border border-gray-600 overflow-auto max-h-96 font-mono text-sm">
            {resultText}
          </pre>
          {successMessage && (
            <p className="mt-3 text-secondary font-medium animate-fade-in">
              {successMessage}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
