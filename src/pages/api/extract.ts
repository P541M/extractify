import type { NextApiRequest, NextApiResponse } from "next";

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

  try {
    // Extract owner and repo from the URL using regex
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub repository URL" });
    }
    const owner = match[1];
    const repo = match[2];

    // Fetch repository info to determine the default branch and check if it's public
    const repoInfoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    if (!repoInfoRes.ok) {
      return res.status(400).json({ error: "Failed to fetch repository info" });
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

    // Fetch the repository tree recursively
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`
    );
    if (!treeRes.ok) {
      return res.status(400).json({ error: "Failed to fetch repository tree" });
    }
    const treeData = await treeRes.json();
    const files = treeData.tree.filter((item: any) => item.type === "blob");

    // Limit the number of files processed (for demo purposes)
    const limit = 50;
    const selectedFiles = files.slice(0, limit);

    let combinedCode = "";

    for (const file of selectedFiles) {
      const filePath = file.path;
      // Get file content from the GitHub API
      const fileRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${defaultBranch}`
      );
      if (!fileRes.ok) {
        continue;
      }
      const fileData = await fileRes.json();
      // Decode base64 content
      const content = Buffer.from(fileData.content, "base64").toString("utf8");

      combinedCode += `\n\n=== ${filePath} ===\n\n${content}\n`;
    }

    res.status(200).json({ code: combinedCode });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
