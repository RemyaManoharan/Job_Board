import { useJobStore } from "../../store/jobStore";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";

const Pagination = () => {
  const pagination = useJobStore((state) => state.pagination);
  const setPage = useJobStore((state) => state.setPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPage(newPage);
    }
  };

  // Don't show pagination if there's only 1 page
  if (pagination.pages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => handlePageChange(1)}
        disabled={pagination.currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        <ChevronsLeft size={16} />
      </button>

      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page number buttons - show up to 5 pages */}
      {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
        // Center current page in the displayed range
        let pageNum;
        if (pagination.pages <= 5) {
          pageNum = index + 1;
        } else {
          const startPage = Math.max(
            1,
            Math.min(pagination.currentPage - 2, pagination.pages - 4)
          );
          pageNum = startPage + index;
        }

        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 rounded-md ${
              pagination.currentPage === pageNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.pages}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>

      <button
        onClick={() => handlePageChange(pagination.pages)}
        disabled={pagination.currentPage === pagination.pages}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        <ChevronsRight size={16} />
      </button>

      <span className="ml-2 text-sm text-gray-600">
        Page {pagination.currentPage} of {pagination.pages}({pagination.total}{" "}
        items)
      </span>
    </div>
  );
};

export default Pagination;
