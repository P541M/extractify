// src/pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultText("");
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
        // Display the error message returned by the API
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
      alert("Code copied to clipboard!");
    } catch (err) {
      alert("Failed to copy code.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded p-8">
        <h1 className="text-2xl font-bold mb-4">Extractify</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2 text-gray-700">
            Enter GitHub Repository URL:
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="https://github.com/owner/repo"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Extracting..." : "Extract Code"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {resultText && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Extracted Code</h2>
            <textarea
              readOnly
              value={resultText}
              rows={10}
              className="w-full p-2 border border-gray-300 rounded"
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
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download as .txt
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
