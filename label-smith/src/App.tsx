// src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileList from "./components/FileList";
import FileContent from "./components/FileContent";
import "./App.scss";

const App: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/list-files").then((response) => setFiles(response.data));
  }, []);

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    axios
      .get(`/api/file-content?fileName=${fileName}`)
      .then((response) => setFileContent(response.data));
  };

  const handleSyncFile = () => {
    if (selectedFile && fileContent) {
      axios
        .post("/api/sync-file", {
          fileName: selectedFile,
          content: fileContent,
        })
        .then(() => {
          alert("File synced successfully");
        });
    }
  };

  return (
    <div>
      <h1>File List</h1>
      <FileList files={files} onFileClick={handleFileClick} />
      {fileContent && (
        <FileContent
          fileName={selectedFile!}
          content={fileContent}
          onSync={handleSyncFile}
        />
      )}
    </div>
  );
};

export default App;
