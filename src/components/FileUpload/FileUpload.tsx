"use client";

import type React from "react";
import { useState, useRef } from "react";
import "./FileUpload.css";

interface FileUploadProps {
  label: string;
  accept?: string;
  error?: string;
  onChange?: (file: File | null) => void;
  required?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = ".pdf",
  error,
  onChange,
  required = false,
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    onChange?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type === "application/pdf") {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`file-upload ${className}`}>
      <label className="file-upload__label">
        {label}
        {required && <span className="file-upload__required">*</span>}
      </label>

      <div
        className={`file-upload__dropzone ${
          isDragOver ? "file-upload__dropzone--drag-over" : ""
        } ${error ? "file-upload__dropzone--error" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="file-upload__input"
        />

        {selectedFile ? (
          <div className="file-upload__selected">
            <div className="file-upload__file-info">
              <svg
                className="file-upload__file-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              <span className="file-upload__file-name">
                {selectedFile.name}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="file-upload__remove"
              aria-label="Remover arquivo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="file-upload__placeholder">
            <svg
              className="file-upload__upload-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <p className="file-upload__text">
              <span className="file-upload__text-primary">
                Clique para selecionar
              </span>
              <span className="file-upload__text-secondary">
                ou arraste o arquivo PDF aqui
              </span>
            </p>
          </div>
        )}
      </div>

      {error && <span className="file-upload__error">{error}</span>}
    </div>
  );
};

export default FileUpload;
