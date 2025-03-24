"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "@/components/Datatable";
import FileUploader from "@/utils/FileDropzone";
import DeleteButton from "@/components/DeleteButton";

interface Metadata {
  source: string;
  textChunk: string;
}
export default function PdfUpload() {
  const [data, setData] = useState<Metadata[]>([]);

  // Fetch Data from Backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/ai/read`,
        {
          headers: {
            securitykey: process.env.NEXT_PUBLIC_SECURITY_KEY || "",
          },
        }
      );
      console.log(response.data.metadatas);
      setData(response.data.metadatas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            PDF Upload and Data Management
          </h1>
          <p className="mt-2 text-gray-600">
            Upload your PDFs, view data, and manage your uploads effortlessly.
          </p>
        </header>

        {/* File Uploader Section */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-lg">
          <FileUploader onUploadSuccess={fetchData} />
        </section>

        {/* Data Table Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-gray-700">Delete</h2>
            <DeleteButton onDeleteSuccess={fetchData} />
          </div>
          {/* Display DataTable with the fetched data */}
          <div className="bg-white rounded-lg shadow-lg">
            <DataTable data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}
