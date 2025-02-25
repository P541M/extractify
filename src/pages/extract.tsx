// src/pages/extract.tsx
import { useState, useEffect } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Automatically add the dark class to html for dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultText("");
    setSuccessMessage("");
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to fetch repository code.");
      } else {
        setResultText(data.code);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setSuccessMessage("Code copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to copy code.");
    }
  };

  const handleDownload = () => {
    setSuccessMessage("Code downloaded as .txt!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-gray-800 shadow-md rounded p-8">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Extractify</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2 text-foreground">
            Enter GitHub Repository URL:
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded mb-4 bg-gray-700 text-foreground"
            placeholder="https://github.com/owner/repo"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && (
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            {loading ? "Extracting..." : "Extract Code"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {resultText && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              Extracted Code
            </h2>
            <textarea
              readOnly
              value={resultText}
              rows={10}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-foreground"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCopy}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Copy Code
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  resultText
                )}`}
                download="code.txt"
                onClick={handleDownload}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download as .txt
              </a>
            </div>
            {successMessage && (
              <p className="mt-4 text-green-400 font-medium">
                {successMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
