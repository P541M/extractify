import React from "react";
interface AccessDeniedErrorProps {
  repoUrl: string;
  errorMessage: string;
}
export default function AccessDeniedError({
  repoUrl,
  errorMessage,
}: AccessDeniedErrorProps) {
  // Extract repository owner and name for display
  const getRepoDetails = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match && match[1] && match[2]) {
      const owner = match[1];
      const repo = match[2].replace(/\.git$/, "");
      return { owner, repo };
    }
    return { owner: "Unknown", repo: "Unknown" };
  };
  const { owner, repo } = getRepoDetails(repoUrl);
  return (
    <div className="w-full bg-red-900/20 rounded-xl p-6 border border-red-700/50 animate-fade-in">
      <div className="flex items-start">
        <svg
          className="h-12 w-12 text-red-400 mr-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <div>
          <h3 className="font-bold text-xl text-red-400 mb-2">Access Denied</h3>
          <p className="text-red-200 mb-4">{errorMessage}</p>
          <div className="bg-red-900/30 rounded-lg p-4 border border-red-700/30 mb-4">
            <h4 className="font-medium text-white mb-2">Repository Details</h4>
            <ul className="space-y-1 text-red-200">
              <li>
                <span className="text-red-300 font-medium">Owner:</span> {owner}
              </li>
              <li>
                <span className="text-red-300 font-medium">Repository:</span>{" "}
                {repo}
              </li>
              <li>
                <span className="text-red-300 font-medium">URL:</span> {repoUrl}
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-medium text-white mb-2">Possible Solutions</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Check if the repository exists and you have the correct URL
              </li>
              <li>
                Make sure you&apos;re signed in with an account that has access
                to this repository
              </li>
              <li>
                If it&apos;s a private repository, request access from the
                repository owner
              </li>
              <li>
                Try logging out and logging back in to refresh your GitHub
                tokens
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
