// src/types/file-system.d.ts
// Add type definitions for HTML input element with webkitdirectory property
interface HTMLInputElementWithDirectory extends HTMLInputElement {
  webkitdirectory?: boolean;
  directory?: boolean;
}

// FileSystem interface type
interface FileSystemObj {
  name: string;
  root: FileSystemDirectoryEntry;
}

// Add type definitions for WebkitFileSystem API
interface FileSystemEntry {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
  fullPath: string;
  filesystem: FileSystemObj;
  getParent(
    successCallback: (parent: FileSystemDirectoryEntry) => void,
    errorCallback?: (error: Error) => void
  ): void;
}

// Define options interface for FileSystem operations
interface FileSystemOptions {
  create?: boolean;
  exclusive?: boolean;
}

interface FileSystemDirectoryEntry extends FileSystemEntry {
  createReader(): FileSystemDirectoryReader;
  getFile(
    path?: string,
    options?: FileSystemOptions,
    successCallback?: (file: FileSystemFileEntry) => void,
    errorCallback?: (error: Error) => void
  ): void;
  getDirectory(
    path?: string,
    options?: FileSystemOptions,
    successCallback?: (directory: FileSystemDirectoryEntry) => void,
    errorCallback?: (error: Error) => void
  ): void;
}

interface FileSystemDirectoryReader {
  readEntries(
    successCallback: (entries: FileSystemEntry[]) => void,
    errorCallback?: (error: Error) => void
  ): void;
}

interface FileSystemFileEntry extends FileSystemEntry {
  file(
    successCallback: (file: File) => void,
    errorCallback?: (error: Error) => void
  ): void;
}

interface File extends Blob {
  webkitRelativePath?: string;
}

// Add DataTransfer item methods
interface DataTransferItem {
  webkitGetAsEntry(): FileSystemEntry | null;
}
