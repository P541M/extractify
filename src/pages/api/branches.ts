import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

interface Data {
  branches?: string[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.accessToken) {
    return res
      .status(401)
      .json({ error: "Authentication required. Please sign in again." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { repoUrl } = req.body;
  if (!repoUrl) {
    return res.status(400).json({ error: "Repository URL is required" });
  }

  const githubHeaders = {
    "User-Agent": "Extractify",
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${token.accessToken}`,
  };

  try {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }
    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    // Get repository branches
    const branchesRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}/branches`,
      { headers: githubHeaders }
    );

    if (!branchesRes.ok) {
      const errorResp = await branchesRes.json();
      return res
        .status(branchesRes.status)
        .json({ error: errorResp.message || "Failed to fetch branches" });
    }

    const branchesData = await branchesRes.json();
    const branches = branchesData.map(
      (branch: { name: string }) => branch.name
    );

    res.status(200).json({ branches });
  } catch (error: unknown) {
    console.error("API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ error: message });
  }
}
