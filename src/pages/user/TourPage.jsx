import { useEffect, useMemo, useState } from "react";

import TourHeader from "../../components/user/TourHeader";
import TourCategory from "../../components/user/TourCategory";
import TourToolbar from "../../components/user/TourToolbar";
import TourGrid from "../../components/user/TourGrid";
import TourEmpty from "../../components/user/TourEmpty";
import TourPagination from "../../components/user/TourPagination";

import api from "../../api/api";

function TourPage() {
  const [categories, setCategories] = useState([
    {
      id: "all",
      name: "Tất cả tour",
    },
  ]);

  const [tours, setTours] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [apiCurrentPage, setApiCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/category");

        let responseData = response;

        if (
          response?.data &&
          !Array.isArray(response.data) &&
          typeof response.data === "object"
        ) {
          responseData = response.data;
        }

        const categoryData = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData?.data)
            ? responseData.data
            : [];

        const formattedCategories = categoryData
          .filter((category) => category?.idCategory && category?.nameCategory)
          .map((category) => ({
            id: category.idCategory,
            name: category.nameCategory,
          }));

        setCategories([
          {
            id: "all",
            name: "Tất cả tour",
          },
          ...formattedCategories,
        ]);
      } catch (error) {
        console.error("Fetch categories error:", error);

        setCategories([
          {
            id: "all",
            name: "Tất cả tour",
          },
        ]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        let response;

        if (searchKeyword.trim()) {
          response = await api.get(
            `/api/tour/search/${encodeURIComponent(searchKeyword.trim())}`,
            {
              params: {
                pageNo: currentPage,
              },
            },
          );
        } else if (activeCategory !== "all") {
          response = await api.get(`/api/tour/idcate=${activeCategory}`, {
            params: {
              pageNo: currentPage,
            },
          });
        } else {
          response = await api.get("/api/tour", {
            params: {
              pageNo: currentPage,
            },
          });
        }

        let responseData;

        if (
          response &&
          typeof response === "object" &&
          !Array.isArray(response) &&
          (response.totalPages !== undefined ||
            response.currentPage !== undefined ||
            response.data !== undefined)
        ) {
          responseData = response;
        } else if (
          response?.data &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          (response.data.totalPages !== undefined ||
            response.data.currentPage !== undefined ||
            response.data.data !== undefined)
        ) {
          responseData = response.data;
        } else if (Array.isArray(response)) {
          responseData = {
            data: response,
          };
        } else if (Array.isArray(response?.data)) {
          responseData = {
            data: response.data,
          };
        } else {
          responseData = {
            data: [],
          };
        }

        const tourData = Array.isArray(responseData?.data)
          ? responseData.data
          : Array.isArray(responseData)
            ? responseData
            : [];

        const formattedTours = tourData.map((tour) => {
          const images = Array.isArray(tour?.tourImageDTOS)
            ? tour.tourImageDTOS
            : [];

          const thumbnail =
            images.find(
              (image) =>
                image?.isThumbnail === true || image?.isThumbnail === "true",
            ) || images[0];

          const imageUrl =
            thumbnail?.imageUrl ||
            thumbnail?.imgaeUrl ||
            thumbnail?.url ||
            null;

          return {
            ...tour,

            id: tour?.idTour,

            title: tour?.nameTour || "",

            image: imageUrl,

            location: tour?.destination || "",

            duration: tour?.time || "",

            people: tour?.maxPeople
              ? `Tối đa ${tour.maxPeople} người`
              : "Chưa cập nhật",

            price:
              tour?.priceAdult !== null && tour?.priceAdult !== undefined
                ? Number(tour.priceAdult)
                : 0,

            oldPrice:
              tour?.oldPrice !== null && tour?.oldPrice !== undefined
                ? Number(tour.oldPrice)
                : null,

            rating:
              tour?.rating !== null && tour?.rating !== undefined
                ? String(tour.rating)
                : "0",

            reviews:
              tour?.reviews !== null && tour?.reviews !== undefined
                ? tour.reviews
                : 0,

            badge: tour?.badge || null,
          };
        });

        setTours(formattedTours);

        const backendTotalPages = Number(responseData?.totalPages);

        if (Number.isFinite(backendTotalPages) && backendTotalPages > 0) {
          setTotalPages(backendTotalPages);
        } else {
          setTotalPages(formattedTours.length > 0 ? 1 : 0);
        }

        const backendCurrentPage = Number(responseData?.currentPage);

        if (Number.isFinite(backendCurrentPage) && backendCurrentPage > 0) {
          setApiCurrentPage(backendCurrentPage);
        } else {
          setApiCurrentPage(currentPage);
        }

        const backendTotalElements = Number(
          responseData?.totalElements ??
            responseData?.totalItems ??
            responseData?.totalCount,
        );

        if (
          Number.isFinite(backendTotalElements) &&
          backendTotalElements >= 0
        ) {
          setTotalElements(backendTotalElements);
        } else {
          setTotalElements(formattedTours.length);
        }
      } catch (error) {
        console.error("Fetch tours error:", error);

        setTours([]);
        setTotalPages(0);
        setTotalElements(0);
        setApiCurrentPage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [currentPage, searchKeyword, activeCategory]);

  const sortedTours = useMemo(() => {
    const result = [...tours];

    if (sortType === "price-asc") {
      result.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    }

    if (sortType === "price-desc") {
      result.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    }

    return result;
  }, [tours, sortType]);

  const paginatedTours = sortedTours;

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchTerm("");
    setSearchKeyword("");
    setCurrentPage(1);
    setApiCurrentPage(1);
    setSortType("default");
  };

  const handleSearch = () => {
    const keyword = searchTerm.trim();

    setActiveCategory("all");
    setCurrentPage(1);
    setApiCurrentPage(1);
    setSearchKeyword(keyword);
  };

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const handlePageChange = (page) => {
    const targetPage = Number(page);

    if (!Number.isInteger(targetPage)) {
      return;
    }

    if (targetPage < 1 || targetPage > totalPages) {
      return;
    }

    if (targetPage === currentPage) {
      return;
    }

    setCurrentPage(targetPage);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchKeyword("");
    setActiveCategory("all");
    setCurrentPage(1);
    setApiCurrentPage(1);
    setSortType("default");
  };

  const activeCategoryName =
    categories.find((category) => category.id === activeCategory)?.name || "";

  const displayTotalCount =
    totalElements > 0 ? totalElements : paginatedTours.length;

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
        py-16
        sm:py-20
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-40
            top-40
            h-96
            w-96
            rounded-full
            bg-cyan-100/50
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-0
            h-96
            w-96
            rounded-full
            bg-emerald-100/40
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <TourHeader />

        <TourCategory
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {activeCategory !== "all" && !searchKeyword && (
          <div className="mb-5 flex items-center gap-2">
            <span className="text-sm text-slate-500">Danh mục:</span>

            <span
              className="
                rounded-full
                bg-cyan-50
                px-4
                py-1.5
                text-sm
                font-bold
                text-cyan-700
              "
            >
              {activeCategoryName}
            </span>
          </div>
        )}

        <TourToolbar
          currentCount={paginatedTours.length}
          totalCount={displayTotalCount}
          sortType={sortType}
          onSortChange={handleSortChange}
        />

        {searchKeyword && (
          <div
            className="
              mb-5
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-cyan-100
              bg-cyan-50
              px-5
              py-3
            "
          >
            <div className="text-sm text-slate-600">
              Kết quả tìm kiếm cho:
              <span className="ml-1 font-bold text-cyan-700">
                "{searchKeyword}"
              </span>
            </div>

            <button
              type="button"
              onClick={handleClearSearch}
              className="
                text-sm
                font-semibold
                text-cyan-700
                transition
                hover:text-cyan-900
              "
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div
              className="
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-cyan-500
              "
            />
          </div>
        ) : paginatedTours.length > 0 ? (
          <TourGrid tours={paginatedTours} />
        ) : (
          <TourEmpty />
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-10">
            <TourPagination
              currentPage={apiCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default TourPage;
