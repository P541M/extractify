import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

interface Data {
  code?: string;
  error?: string;
}

interface GitTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

interface ExtractRequest {
  repoUrl: string;
  includeLineNumbers?: boolean;
  branch?: string;
}

const DEBUG = process.env.DEBUG_LOGGING === "true";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (DEBUG) {
    console.log("Request headers:", req.headers);
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (DEBUG) {
    console.log("JWT token:", token);
  }

  if (!token || !token.accessToken) {
    return res
      .status(401)
      .json({ error: "Authentication required. Please sign in again." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { repoUrl, includeLineNumbers, branch } = req.body as ExtractRequest;
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
          error: "You don't have permission to access this repository.",
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

    if (DEBUG) {
      console.log(
        "Repository visibility:",
        repoInfo.private ? "Private" : "Public"
      );
    }

    // Use the specified branch or fall back to the default branch
    const branchToUse = branch || repoInfo.default_branch || "main";

    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}/git/trees/${branchToUse}?recursive=1`,
      { headers: githubHeaders }
    );
    if (!treeRes.ok) {
      const errorResp = await treeRes.json();
      console.error("Tree fetch error:", errorResp);
      if (treeRes.status === 403) {
        return res.status(403).json({
          error: "You don't have permission to access this repository's tree.",
        });
      }
      return res.status(treeRes.status).json({
        error: errorResp.message || "Failed to fetch repository tree",
      });
    }
    const treeData = await treeRes.json();

    const files: GitTreeItem[] = (treeData.tree as GitTreeItem[])
      .filter((item) => item.type === "blob")
      .filter((file) => file.path !== "package-lock.json");

    const limit = 50;
    const selectedFiles = files.slice(0, limit);
    let combinedCode = "";

    // Define image and document file extensions to omit content
    const imageExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".bmp",
      ".tiff",
      ".svg",
      ".webp",
      ".ico",
    ];
    const documentExtensions = [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".odt",
      ".ods",
      ".odp",
      ".rtf",
    ];

    for (const file of selectedFiles) {
      const fileName = file.path.split("/").pop() || "";
      const extension = fileName.split(".").pop()?.toLowerCase();
      const isImage = imageExtensions.includes(`.${extension}`);
      const isDocument = documentExtensions.includes(`.${extension}`);

      if (isImage) {
        combinedCode += `\nFile name: ${fileName}\nFile path: ${file.path}\nFile Code: [Image content omitted]\n\n`;
      } else if (isDocument) {
        combinedCode += `\nFile name: ${fileName}\nFile path: ${file.path}\nFile Code: [Document content omitted]\n\n`;
      } else {
        const fileRes = await fetch(
          `https://api.github.com/repos/${owner}/${cleanRepo}/contents/${file.path}?ref=${branchToUse}`,
          { headers: githubHeaders }
        );
        if (fileRes.ok) {
          const fileData = await fileRes.json();
          let content = Buffer.from(fileData.content, "base64").toString(
            "utf8"
          );
          if (includeLineNumbers) {
            content = content
              .split("\n")
              .map((line, index) => `${index + 1}: ${line}`)
              .join("\n");
          }
          combinedCode += `\nFile name: ${fileName}\nFile path: ${file.path}\nFile Code:\n${content}\n\n`;
        } else {
          console.error(`Failed to fetch file ${file.path}: ${fileRes.status}`);
          combinedCode += `\nFile name: ${fileName}\nFile path: ${file.path}\nFile Code: [Content could not be fetched]\n\n`;
        }
      }
    }

    res.status(200).json({ code: combinedCode });
  } catch (error: unknown) {
    console.error("API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ error: message });
  }
}
