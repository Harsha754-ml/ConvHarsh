import React, { useCallback, useState } from 'react';
import { Tilt3D } from './Tilt3D';

export const DropZone = ({ onFileSelected, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelected(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onFileSelected]);

  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  }, [onFileSelected]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Tilt3D className={`relative w-full ${className}`}>
      <div
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${
          isDragOver ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20' : 'border-border-color bg-bg-main/50 hover:border-accent'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
        />
        <svg
          className="w-12 h-12 mb-4 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="text-lg text-primary mb-1">Drag & drop files here</p>
        <p className="text-sm text-secondary">or <span className="text-accent hover:underline">click to browse</span></p>
      </div>
    </Tilt3D>
  );
};
