import { Search } from "lucide-react";

function TourCategory({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="mb-8">
      <div className="mx-auto mb-6 w-full max-w-2xl">
        <div className="relative">
          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm tour..."
            className="
              w-full
              rounded-full
              border
              border-slate-200
              bg-white
              py-3
              pl-12
              pr-32
              text-sm
              text-slate-700
              shadow-sm
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:border-cyan-400
              focus:ring-4
              focus:ring-cyan-500/10
            "
          />

          <button
            type="button"
            onClick={onSearch}
            className="
              absolute
              right-1.5
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-cyan-600
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-cyan-700
              active:scale-95
            "
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`
                rounded-full
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-300

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
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TourCategory;
