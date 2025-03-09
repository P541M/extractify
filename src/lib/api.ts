import { Octokit } from "@octokit/rest";

/**
 * Creates an Octokit instance with the provided access token.
 * @param accessToken - GitHub OAuth access token from the user's session.
 * @returns An authenticated Octokit instance.
 */
export function getOctokit(accessToken: string): Octokit {
  return new Octokit({ auth: accessToken });
}

/**
 * Parses a GitHub repository URL to extract the owner and repo name.
 * @param url - The repository URL (e.g., https://github.com/owner/repo).
 * @returns An object with `owner` and `repo` properties.
 * @throws Error if the URL is invalid.
 */
export function parseRepoUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match && match[1] && match[2]) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  }
  throw new Error("Invalid repository URL");
}

// Define a type for GitHub API errors
interface GitHubApiError {
  status?: number;
  message?: string;
}

/**
 * Checks if the user has access to a GitHub repository.
 * @param repoUrl - The repository URL to check.
 * @param accessToken - The user's GitHub access token.
 * @returns A promise resolving to `true` if accessible, `false` if access is denied (403/404).
 * @throws Error for unexpected issues (e.g., network errors).
 */
export async function checkRepoAccess(
  repoUrl: string,
  accessToken: string
): Promise<boolean> {
  const octokit = getOctokit(accessToken);
  const { owner, repo } = parseRepoUrl(repoUrl);
  try {
    await octokit.repos.get({ owner, repo });
    return true;
  } catch (error) {
    // Type guard to check if error has the right shape
    if (typeof error === "object" && error !== null) {
      const githubError = error as GitHubApiError;
      if (githubError.status === 404 || githubError.status === 403) {
        return false;
      }
    }
    throw error;
  }
}
