// src/pages/api/extract.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  code?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { repoUrl } = req.body;
  if (!repoUrl) {
    return res.status(400).json({ error: "Repository URL is required" });
  }

  // Get the current session (if any) to retrieve the user's GitHub token
  const session = await getSession({ req });

  // Build GitHub API headers. Use the user's token if they're authenticated.
  const githubHeaders = {
    "User-Agent": "Extractify (https://github.com/yourusername/yourrepo)", // Replace with your app's info
    Accept: "application/vnd.github.v3+json",
    ...(session?.accessToken && {
      Authorization: `token ${session.accessToken}`,
    }),
  };

  try {
    // Extract owner and repo from the URL using regex
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }
    const owner = match[1];
    let repo = match[2].replace(/\.git$/, ""); // Remove .git suffix if present

    // Fetch repository info with OAuth headers
    const repoInfoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers: githubHeaders }
    );
    if (!repoInfoRes.ok) {
      const errorResp = await repoInfoRes.json();
      console.error("GitHub Error:", errorResp);
      return res.status(400).json({ error: "Failed to fetch repo info" });
    }
    const repoInfo = await repoInfoRes.json();

    // Check if the repository is private
    if (repoInfo.private) {
      return res.status(400).json({
        error:
          "The repository is private. This tool only works on public repositories.",
      });
    }

    const defaultBranch = repoInfo.default_branch || "main";

    // Fetch the repository tree recursively with OAuth headers
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      { headers: githubHeaders }
    );
    if (!treeRes.ok) {
      return res.status(400).json({ error: "Failed to fetch repository tree" });
    }
    const treeData = await treeRes.json();
    let files = treeData.tree.filter((item: any) => item.type === "blob");

    // Exclude the package-lock.json file
    files = files.filter((file: any) => file.path !== "package-lock.json");

    // Limit the number of files processed (for demo purposes)
    const limit = 50;
    const selectedFiles = files.slice(0, limit);

    let combinedCode = "";

    for (const file of selectedFiles) {
      const filePath = file.path;
      // Get file content from the GitHub API with OAuth headers
      const fileRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${defaultBranch}`,
        { headers: githubHeaders }
      );
      if (!fileRes.ok) {
        continue;
      }
      const fileData = await fileRes.json();
      // Decode base64 content
      const content = Buffer.from(fileData.content, "base64").toString("utf8");
      // Extract file name from file path
      const fileName = filePath.split("/").pop();

      combinedCode += `\nFile name: ${fileName}\nFile path: ${filePath}\nFile Code:\n${content}\n\n`;
    }

    res.status(200).json({ code: combinedCode });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
