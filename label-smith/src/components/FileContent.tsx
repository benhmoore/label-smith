import React from "react";

interface FileContentProps {
  fileName: string;
  content: string;
  onSync: () => void;
}

const FileContent: React.FC<FileContentProps> = ({
  fileName,
  content,
  onSync,
}) => {
  return (
    <div>
      <h2>Content of {fileName}</h2>
      <pre>{content}</pre>
      <button onClick={onSync}>Sync File</button>
    </div>
  );
};

export default FileContent;
