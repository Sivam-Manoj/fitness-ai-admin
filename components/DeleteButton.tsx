import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; // Import an icon for the close button

interface DeleteButtonProps {
  onDeleteSuccess: () => void;
}
const DeleteButton = ({ onDeleteSuccess }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Delete action
  const handleDelete = async () => {
    setIsLoading(true); // Start loading
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/ai/delete`,
        {
          headers: {
            securitykey: process.env.NEXT_PUBLIC_SECURITY_KEY || "",
          },
        }
      );
      setIsLoading(false); // Stop loading
      setIsModalOpen(false); // Close the confirmation modal after success
      onDeleteSuccess();
      alert("Data deleted successfully!");
    } catch (error) {
      setIsLoading(false); // Stop loading in case of error
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to delete this item?
            </h3>

            {/* Loading Spinner */}
            {isLoading ? (
              <div className="w-10 h-10 border-4 border-t-4 border-gray-400 border-solid rounded-full animate-spin mx-auto"></div>
            ) : (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
