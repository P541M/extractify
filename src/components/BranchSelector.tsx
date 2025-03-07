import React from "react";
interface BranchSelectorProps {
  branches: string[];
  selectedBranch: string;
  onBranchSelect: (branch: string) => void;
  isLoading: boolean;
}
export default function BranchSelector({
  branches,
  selectedBranch,
  onBranchSelect,
  isLoading,
}: BranchSelectorProps) {
  if (branches.length <= 1 || isLoading) return null;
  return (
    <div className="w-full bg-card rounded-xl p-6 shadow-lg border border-border mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="mb-2 sm:mb-0">
          <h3 className="font-medium text-white flex items-center">
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
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
            Other Branches
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Are there any other branches? If so, extract the code from them.
          </p>
        </div>
        <div className="relative w-full sm:w-auto min-w-[200px]">
          <select
            className="bg-background text-white rounded-lg p-2 pl-4 pr-8 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full appearance-none"
            value={selectedBranch}
            onChange={(e) => onBranchSelect(e.target.value)}
            aria-label="Select branch"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
