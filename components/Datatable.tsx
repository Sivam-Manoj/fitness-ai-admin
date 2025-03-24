"use client";
import { useState } from "react";

interface DataTableProps {
  data: { source: string; textChunk: string }[];
}

export default function DataTable({ data }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mt-6 w-full max-w-8xl mx-auto">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
        Data Set
      </h2>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
        <table className="w-full text-left bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="p-3 text-sm md:text-base">Source</th>
              <th className="p-3 text-sm md:text-base">Content</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3 text-gray-700">{item.source}</td>
                  <td className="p-3 text-gray-600">{item.textChunk}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination in Table Footer */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
