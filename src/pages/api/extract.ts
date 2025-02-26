// src/pages/api/extract.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = {
  code?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Request headers:", req.headers);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("JWT token:", token);

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
    "User-Agent": "Extractify", // Updated to app name
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${token.accessToken}`,
  };

  try {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }
    const [_, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    const repoInfoRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}`,
      { headers: githubHeaders }
    );
    if (!repoInfoRes.ok) {
      const errorResp = await repoInfoRes.json();
      console.error("Repo fetch error:", errorResp);
      if (repoInfoRes.status === 403) {
        return res.status(403).json({
          error: "You don’t have permission to access this repository.",
        });
      } else if (repoInfoRes.status === 404) {
        return res.status(404).json({
          error: "Repository not found or you lack access.",
        });
      }
      return res
        .status(repoInfoRes.status)
        .json({ error: errorResp.message || "Failed to fetch repo info" });
    }
    const repoInfo = await repoInfoRes.json();

    // Removed private repo restriction
    console.log(
      "Repository visibility:",
      repoInfo.private ? "Private" : "Public"
    );

    const defaultBranch = repoInfo.default_branch || "main";
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}/git/trees/${defaultBranch}?recursive=1`,
      { headers: githubHeaders }
    );
    if (!treeRes.ok) {
      const errorResp = await treeRes.json();
      console.error("Tree fetch error:", errorResp);
      if (treeRes.status === 403) {
        return res.status(403).json({
          error: "You don’t have permission to access this repository’s tree.",
        });
      }
      return res.status(treeRes.status).json({
        error: errorResp.message || "Failed to fetch repository tree",
      });
    }
    const treeData = await treeRes.json();
    const files = treeData.tree
      .filter((item: any) => item.type === "blob")
      .filter((file: any) => file.path !== "package-lock.json");

    const limit = 50;
    const selectedFiles = files.slice(0, limit);
    let combinedCode = "";

    for (const file of selectedFiles) {
      const fileRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepo}/contents/${file.path}?ref=${defaultBranch}`,
        { headers: githubHeaders }
      );
      if (!fileRes.ok) {
        console.error(`Failed to fetch file ${file.path}: ${fileRes.status}`);
        continue; // Skip files we can’t access
      }
      const fileData = await fileRes.json();
      const content = Buffer.from(fileData.content, "base64").toString("utf8");
      const fileName = file.path.split("/").pop();
      combinedCode += `\nFile name: ${fileName}\nFile path: ${file.path}\nFile Code:\n${content}\n\n`;
    }

    res.status(200).json({ code: combinedCode });
  } catch (error: any) {
    console.error("API error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
