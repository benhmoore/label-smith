<<<<<<< HEAD
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
=======
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
>>>>>>> main

export default App;
