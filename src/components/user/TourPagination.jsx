import { ChevronLeft, ChevronRight } from "lucide-react";

function TourPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="
        mt-12
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {/* PREVIOUS */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition
          hover:border-cyan-500
          hover:text-cyan-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={19} />
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              text-sm
              font-bold
              transition-all

              ${
                isActive
                  ? `
                    bg-cyan-600
                    text-white
                    shadow-lg
                    shadow-cyan-500/20
                  `
                  : `
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    hover:border-cyan-400
                    hover:text-cyan-600
                  `
              }
            `}
            >
              {page}
            </button>
          );
        },
      )}

      {/* NEXT */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition
          hover:border-cyan-500
          hover:text-cyan-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={19} />
      </button>
    </div>
  );
}

export default TourPagination;
