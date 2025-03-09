// src/components/LocalFileUploader.tsx
import React, { useState, useRef } from "react";

interface LocalFileUploaderProps {
  onFilesProcessed: (resultText: string) => void;
  setIsLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

export default function LocalFileUploader({
  onFilesProcessed,
  setIsLoading,
  setProgress,
}: LocalFileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    // Get the dropped folder or files
    const items = e.dataTransfer.items;
    if (items) {
      processFiles(items);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      processSelectedFiles(filesArray);
    }
  };

  const processFiles = async (items: DataTransferItemList) => {
    setIsLoading(true);
    setProgress(10);
    try {
      const entries: FileSystemEntry[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            entries.push(entry);
          }
        }
      }
      setProgress(20);
      const files = await traverseFileSystem(entries);
      setProgress(50);
      await processFileContents(files);
    } catch (err) {
      console.error("Error processing files:", err);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const processSelectedFiles = async (files: File[]) => {
    setIsLoading(true);
    setProgress(10);
    try {
      // Convert File objects to a structure with path and file
      const fileEntries = files.map((file) => ({
        path: file.webkitRelativePath || file.name,
        file,
      }));
      setProgress(50);
      await processFileContents(fileEntries);
    } catch (err) {
      console.error("Error processing selected files:", err);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const traverseFileSystem = async (
    entries: FileSystemEntry[]
  ): Promise<{ path: string; file: File }[]> => {
    const fileEntries: { path: string; file: File }[] = [];
    const traverseEntry = async (entry: FileSystemEntry, path: string = "") => {
      if (entry.isFile) {
        const fileEntry = entry as FileSystemFileEntry;
        const file = await new Promise<File>((resolve) => {
          fileEntry.file(resolve);
        });
        fileEntries.push({ path: path + entry.name, file });
      } else if (entry.isDirectory) {
        const dirEntry = entry as FileSystemDirectoryEntry;
        const dirReader = dirEntry.createReader();
        const readEntries = (): Promise<FileSystemEntry[]> => {
          return new Promise((resolve) => {
            dirReader.readEntries((entries) => {
              if (entries.length > 0) {
                resolve(entries);
              } else {
                resolve([]);
              }
            });
          });
        };
        let dirEntries: FileSystemEntry[] = [];
        let newEntries: FileSystemEntry[] = await readEntries();
        while (newEntries.length > 0) {
          dirEntries = dirEntries.concat(newEntries);
          newEntries = await readEntries();
        }
        for (const childEntry of dirEntries) {
          await traverseEntry(childEntry, path + entry.name + "/");
        }
      }
    };
    for (const entry of entries) {
      await traverseEntry(entry);
    }
    return fileEntries;
  };

  const processFileContents = async (files: { path: string; file: File }[]) => {
    setProgress(60);
    // Define file extensions to skip (binary files, images, etc.)
    const skipExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".bmp",
      ".tiff",
      ".webp",
      ".svg",
      ".ico",
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".zip",
      ".rar",
      ".tar",
      ".gz",
      ".7z",
      ".mp3",
      ".mp4",
      ".avi",
      ".mov",
      ".wav",
      ".ttf",
      ".woff",
      ".woff2",
      ".eot",
      ".so",
      ".dll",
      ".exe",
      ".bin",
    ];
    let combinedCode = "";
    const totalFiles = files.length;
    const maxFiles = Math.min(totalFiles, 50); // Limit to 50 files
    const filesToProcess = files.slice(0, maxFiles);
    for (let i = 0; i < filesToProcess.length; i++) {
      const { path, file } = filesToProcess[i];
      const fileName = file.name;
      const extension = "." + fileName.split(".").pop()?.toLowerCase();
      // Update progress based on file index
      setProgress(60 + Math.floor((i / filesToProcess.length) * 35));
      if (skipExtensions.includes(extension)) {
        if (extension.match(/\.(png|jpg|jpeg|gif|bmp|tiff|webp|svg|ico)$/)) {
          combinedCode += `\nFile name: ${fileName}\nFile path: ${path}\nFile Code: [Image content omitted]\n\n`;
        } else {
          combinedCode += `\nFile name: ${fileName}\nFile path: ${path}\nFile Code: [Binary content omitted]\n\n`;
        }
      } else {
        try {
          const content = await file.text();
          combinedCode += `\nFile name: ${fileName}\nFile path: ${path}\nFile Code:\n${content}\n\n`;
        } catch {
          // Catch error without defining an unused variable
          combinedCode += `\nFile name: ${fileName}\nFile path: ${path}\nFile Code: [Content could not be read]\n\n`;
        }
      }
    }
    if (totalFiles > maxFiles) {
      combinedCode += `\n[Additional ${
        totalFiles - maxFiles
      } files were omitted]\n`;
    }
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      onFilesProcessed(combinedCode);
    }, 500);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        className={`w-full bg-background rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 hover:bg-background/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          // Use attribute assignment for these non-standard attributes
          {...{ webkitdirectory: "", directory: "" }}
          multiple
        />
        <div className="flex flex-col items-center justify-center">
          <svg
            className={`h-12 w-12 mb-3 ${
              isDragging ? "text-primary" : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-lg font-medium text-white mb-1">
            {isDragging ? "Drop your folder here" : "Drag & drop a folder here"}
          </p>
          <p className="text-sm text-gray-400 mb-2">- or -</p>
          <button
            className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileSelect();
            }}
          >
            Browse for folder
          </button>
          <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
            Files will be processed in your browser. No data is uploaded to our
            servers.
          </p>
        </div>
      </div>
    </div>
  );
}
