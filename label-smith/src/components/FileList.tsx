import React from "react";

interface FileListProps {
  files: string[];
  onFileClick: (fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  return (
    <ul>
      {files.map((file) => (
        <li key={file} onClick={() => onFileClick(file)}>
          {file}
        </li>
      ))}
    </ul>
  );
};

export default FileList;
