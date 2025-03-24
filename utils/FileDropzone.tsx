"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { X, FileText, Upload, Loader2 } from "lucide-react";

interface FileUploaderProps {
  onUploadSuccess: () => void;
}

export default function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setIsUploading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/ai/upload`,
        formData,
        {
          headers: {
            securityKey: process.env.NEXT_PUBLIC_SECURITY_KEY || "",
          },
        }
      );
      setIsUploading(false);
      onUploadSuccess();
      setIsOpen(false);
      setFile(null);
    } catch (error) {
      setIsUploading(false);
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Upload PDF
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setFile(null); // Clear selected file
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>

            {/* Dropzone */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
            >
              <input {...getInputProps()} />
              <FileText size={40} className="mx-auto text-gray-500" />
              <p className="text-gray-600 mt-2">
                Drag & drop a <b>PDF</b> here, or click to select one
              </p>
            </div>

            {/* File Info */}
            {file && (
              <div className="mt-4 text-sm text-gray-700">
                Selected: <b>{file.name}</b>
              </div>
            )}

            {/* Upload Button (Right-Aligned) */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpload}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center w-36 disabled:bg-gray-400 transition"
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Upload PDF
                    <Upload size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
