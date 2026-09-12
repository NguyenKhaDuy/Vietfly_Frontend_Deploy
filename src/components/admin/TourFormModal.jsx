/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import {
  X,
  Save,
  ImagePlus,
  Star,
  CalendarDays,
  MapPin,
  LoaderCircle,
} from "lucide-react";

import api from "../../api/api";
import Notification from "../Notification";

const defaultForm = {
  nameTour: "",
  description: "",
  time: "",
  timeDepart: "",
  dateDepart: "",
  introVideo: "",
  promotionLink: "",
  maxPeople: "",
  priceAdult: "",
  priceChildren: "",
  destination: "",
  statusTour: "ACTIVE",
  contactPhone: "",
  contactEmail: "",
  userId: "",
  categoryId: "",
};

function formatDateForInput(date) {
  if (!date) return "";

  if (typeof date === "string" && date.includes("/")) {
    const [day, month, year] = date.split("/");

    if (day && month && year) {
      return `${year}-${month}-${day}`;
    }
  }

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  return "";
}

function formatTimeForInput(time) {
  if (!time) return "";

  return String(time).substring(0, 5);
}

function getErrorMessage(error, fallback = "Đã xảy ra lỗi. Vui lòng thử lại.") {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  return fallback;
}

export default function TourFormModal({
  tour,
  onClose,
  onSave,
  onSuccess,
  onError,
}) {
  const [form, setForm] = useState(defaultForm);

  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({
      type,
      title,
      message,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const [loadingLocations, setLoadingLocations] = useState(false);

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const locationTimerRef = useRef(null);

  const locationWrapperRef = useRef(null);

  const [newImages, setNewImages] = useState([]);

  const [newThumbnailId, setNewThumbnailId] = useState(null);

  const [existingImages, setExistingImages] = useState([]);

  const [deletedImageIds, setDeletedImageIds] = useState([]);

  const newImagesRef = useRef([]);

  const [currentUser, setCurrentUser] = useState(null);

  const [staffUsers, setStaffUsers] = useState([]);

  const [loadingStaff, setLoadingStaff] = useState(false);

  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);

  const [tourStatuses, setTourStatuses] = useState([]);

  const [loadingTourStatuses, setLoadingTourStatuses] = useState(false);

  const [deletingImageId, setDeletingImageId] = useState(null);

  const [updatingThumbnailId, setUpdatingThumbnailId] = useState(null);

  const isEdit = Boolean(tour?.idTour);

  useEffect(() => {
    newImagesRef.current = newImages;
  }, [newImages]);

  useEffect(() => {
    return () => {
      newImagesRef.current.forEach((image) => {
        if (image?.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });

      if (locationTimerRef.current) {
        clearTimeout(locationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(event.target)
      ) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const meResponse = await api.get("/api/me");

        const meData = meResponse;

        setCurrentUser(meData);

        if (meData?.role === "ADMIN") {
          setLoadingStaff(true);

          const userResponse = await api.get("/api/user/all");

          const responseData = userResponse?.data;

          if (Array.isArray(responseData)) {
            setStaffUsers(responseData);
          } else if (Array.isArray(responseData?.data)) {
            setStaffUsers(responseData.data);
          } else {
            setStaffUsers([]);
          }
        }
      } catch (error) {
        setCurrentUser(null);
        setStaffUsers([]);
      } finally {
        setLoadingStaff(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await api.get("/api/category");

        const responseData = response?.data;

        let categoryList = [];

        if (Array.isArray(responseData)) {
          categoryList = responseData;
        } else if (Array.isArray(responseData?.data)) {
          categoryList = responseData.data;
        }

        setCategories(categoryList);
      } catch (error) {
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadTourStatuses = async () => {
      try {
        setLoadingTourStatuses(true);

        const response = await api.get("/api/status/tour");

        const responseData = response?.data;

        let statusList = [];

        if (Array.isArray(responseData)) {
          statusList = responseData;
        } else if (Array.isArray(responseData?.data)) {
          statusList = responseData.data;
        }

        setTourStatuses(statusList);
      } catch (error) {
        setTourStatuses([]);

        showNotification(
          "error",
          "Không thể tải trạng thái",
          getErrorMessage(error, "Không thể lấy danh sách trạng thái tour."),
        );
      } finally {
        setLoadingTourStatuses(false);
      }
    };

    loadTourStatuses();
  }, []);

  const searchLocations = async (keyword) => {
    const value = keyword.trim();

    if (value.length < 2) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      return;
    }

    try {
      setLoadingLocations(true);

      const response = await fetch(
        `https://provinces.open-api.vn/api/v1/p/search/?q=${encodeURIComponent(
          value,
        )}`,
      );

      if (!response.ok) {
        throw new Error(`Province API error: ${response.status}`);
      }

      const data = await response.json();

      const locations = Array.isArray(data) ? data : [];

      setLocationSuggestions(locations);

      setShowLocationSuggestions(locations.length > 0);
    } catch (error) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      destination: value,
    }));

    if (locationTimerRef.current) {
      clearTimeout(locationTimerRef.current);
    }

    if (value.trim().length < 2) {
      setLocationSuggestions([]);

      setLoadingLocations(false);

      setShowLocationSuggestions(false);

      return;
    }

    setShowLocationSuggestions(true);

    locationTimerRef.current = setTimeout(() => {
      searchLocations(value);
    }, 400);
  };

  const handleSelectLocation = (location) => {
    if (!location) {
      return;
    }

    const destination = location.name || "";

    setForm((prev) => ({
      ...prev,
      destination,
    }));

    setLocationSuggestions([]);

    setShowLocationSuggestions(false);
  };

  const clearNewImages = () => {
    newImagesRef.current.forEach((image) => {
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });

    newImagesRef.current = [];

    setNewImages([]);

    setNewThumbnailId(null);
  };

  useEffect(() => {
    if (!tour) {
      setForm({
        ...defaultForm,
      });

      clearNewImages();

      setExistingImages([]);

      setDeletedImageIds([]);

      setLocationSuggestions([]);

      setShowLocationSuggestions(false);

      return;
    }

    setForm({
      nameTour: tour.nameTour ?? "",

      description: tour.description ?? "",

      time: tour.time ?? "",

      timeDepart: formatTimeForInput(tour.timeDepart),

      dateDepart: formatDateForInput(tour.dateDepart),

      introVideo: tour.introVideo ?? "",

      promotionLink: tour.promotionLink ?? "",

      maxPeople:
        tour.maxPeople !== null && tour.maxPeople !== undefined
          ? String(tour.maxPeople)
          : "",

      priceAdult:
        tour.priceAdult !== null && tour.priceAdult !== undefined
          ? String(tour.priceAdult)
          : "",

      priceChildren:
        tour.priceChildren !== null && tour.priceChildren !== undefined
          ? String(tour.priceChildren)
          : "",

      destination: tour.destination ?? "",

      statusTour: tour.statusTour ?? "ACTIVE",

      contactPhone: tour.contactPhone ?? "",

      contactEmail: tour.contactEmail ?? "",

      userId: tour.userId ?? tour.staffId ?? "",

      categoryId: tour.categoryId ?? "",
    });

    setExistingImages(
      Array.isArray(tour.tourImageDTOS) ? tour.tourImageDTOS : [],
    );

    clearNewImages();

    setDeletedImageIds([]);

    setLocationSuggestions([]);

    setShowLocationSuggestions(false);
  }, [tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      showNotification(
        "warning",
        "Ảnh không hợp lệ",
        "Vui lòng chọn file hình ảnh.",
      );

      e.target.value = "";

      return;
    }

    const shouldSetFirstAsThumbnail = newImages.length === 0;

    const mappedFiles = imageFiles.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      isThumbnail: shouldSetFirstAsThumbnail && index === 0,
    }));

    if (shouldSetFirstAsThumbnail && mappedFiles[0]) {
      setNewThumbnailId(mappedFiles[0].id);
    }

    setNewImages((prev) => [...prev, ...mappedFiles]);

    e.target.value = "";
  };

  const handleSetNewThumbnail = (imageId) => {
    if (!imageId) {
      return;
    }

    setNewImages((prev) =>
      prev.map((image) => ({
        ...image,
        isThumbnail: image.id === imageId,
      })),
    );

    setNewThumbnailId(imageId);

    showNotification(
      "success",
      "Đã chọn ảnh đại diện",
      "Ảnh đã được chọn làm ảnh đại diện cho tour.",
    );
  };

  const handleRemoveNewImage = (imageId) => {
    const image = newImages.find((item) => item.id === imageId);

    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    const wasThumbnail = image?.isThumbnail === true;

    let updatedImages = newImages.filter((item) => item.id !== imageId);

    if (wasThumbnail && updatedImages.length > 0) {
      updatedImages = updatedImages.map((item, index) => ({
        ...item,
        isThumbnail: index === 0,
      }));

      setNewThumbnailId(updatedImages[0].id);
    }

    if (updatedImages.length === 0) {
      setNewThumbnailId(null);
    }

    setNewImages(updatedImages);

    showNotification(
      "success",
      "Đã bỏ ảnh",
      "Ảnh mới đã được bỏ khỏi danh sách.",
    );
  };

  const handleRemoveExistingImage = async (image) => {
    if (!image?.idImage || !tour?.idTour) {
      showNotification(
        "error",
        "Xóa ảnh thất bại",
        "Không xác định được thông tin ảnh hoặc tour.",
      );

      return;
    }

    try {
      setDeletingImageId(image.idImage);

      const requestData = {
        imageId: image.idImage,

        tourId: tour.idTour,

        isThumbnail: Boolean(image.thumbnail),
      };

      await api.delete("/api/admin/tour/image", {
        data: requestData,
      });

      setExistingImages((prev) =>
        prev.filter((item) => item.idImage !== image.idImage),
      );

      setDeletedImageIds((prev) => {
        if (prev.includes(image.idImage)) {
          return prev;
        }

        return [...prev, image.idImage];
      });

      showNotification(
        "success",
        "Xóa ảnh thành công",
        "Hình ảnh đã được xóa khỏi tour.",
      );
    } catch (error) {
      showNotification(
        "error",
        "Xóa ảnh thất bại",
        getErrorMessage(error, "Không thể xóa hình ảnh. Vui lòng thử lại."),
      );
    } finally {
      setDeletingImageId(null);
    }
  };

  const handleSetThumbnail = async (imageId) => {
    if (!imageId || !tour?.idTour) {
      showNotification(
        "error",
        "Không thể chọn ảnh",
        "Không xác định được ảnh hoặc tour.",
      );

      return;
    }

    try {
      setUpdatingThumbnailId(imageId);

      const requestData = {
        imageId,

        tourId: tour.idTour,

        isThumbnail: true,
      };

      await api.put("/api/admin/tour/image/thumnail", requestData);

      setExistingImages((prev) =>
        prev.map((image) => ({
          ...image,
          thumbnail: image.idImage === imageId,
        })),
      );

      showNotification(
        "success",
        "Đã chọn ảnh đại diện",
        "Ảnh đã được đặt làm ảnh đại diện cho tour.",
      );
    } catch (error) {
      showNotification(
        "error",
        "Cập nhật thất bại",
        getErrorMessage(error, "Không thể đặt ảnh làm ảnh đại diện."),
      );
    } finally {
      setUpdatingThumbnailId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nameTour.trim()) {
      onError?.("Vui lòng nhập tên tour.");
      return;
    }

    if (!form.destination.trim()) {
      onError?.("Vui lòng nhập điểm đến.");
      return;
    }

    if (
      newImages.length > 0 &&
      !newImages.some((image) => image.isThumbnail === true)
    ) {
      onError?.("Vui lòng chọn ảnh đại diện cho tour.");

      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      if (isEdit && tour?.idTour) {
        formData.append("idTour", tour.idTour);
      }

      formData.append("nameTour", form.nameTour.trim());

      formData.append("description", form.description.trim());

      formData.append("time", form.time.trim());

      if (form.timeDepart) {
        formData.append("timeDepart", `${form.timeDepart}:00`);
      }

      if (form.dateDepart) {
        formData.append("dateDepart", form.dateDepart);
      }

      if (form.introVideo.trim()) {
        formData.append("introVideo", form.introVideo.trim());
      }

      if (form.promotionLink.trim()) {
        formData.append("promotionLink", form.promotionLink.trim());
      }

      if (form.maxPeople) {
        formData.append("maxPeople", String(Number(form.maxPeople)));
      }

      if (form.priceAdult) {
        formData.append("priceAdult", String(Number(form.priceAdult)));
      }

      if (form.priceChildren) {
        formData.append("priceChildren", String(Number(form.priceChildren)));
      }

      formData.append("destination", form.destination.trim());

      formData.append("statusTour", form.statusTour || "ACTIVE");

      formData.append("contactPhone", form.contactPhone.trim());

      formData.append("contactEmail", form.contactEmail.trim());

      if (form.userId) {
        formData.append("userId", form.userId);
      }

      if (form.categoryId) {
        formData.append("categoryId", form.categoryId);
      }

      newImages.forEach((item, index) => {
        const isThumbnail = item.isThumbnail === true;

        formData.append(`tourImages[${index}].image`, item.file);

        formData.append(`tourImages[${index}].thumnail`, String(isThumbnail));
      });

      let response;

      if (isEdit) {
        response = await api.put("/api/admin/tour", formData);
      } else {
        response = await api.post("/api/admin/tour", formData);
      }

      if (onSave) {
        await onSave({
          tourData: form,

          newImages: newImages.map((item) => item.file),

          newThumbnailId,

          existingImages,

          deletedImageIds,

          response: response?.data,
        });
      }

      onSuccess?.(
        isEdit
          ? newImages.length > 0
            ? `Đã cập nhật tour và tải lên ${newImages.length} ảnh mới.`
            : "Thông tin tour đã được cập nhật thành công."
          : `Đã thêm tour thành công${
              newImages.length > 0
                ? ` và tải lên ${newImages.length} ảnh.`
                : "."
            }`,
      );
    } catch (error) {
      const message = getErrorMessage(
        error,
        isEdit
          ? "Không thể cập nhật tour. Vui lòng thử lại."
          : "Không thể thêm tour. Vui lòng thử lại.",
      );

      onError?.(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      {notification && (
        <div className="pointer-events-none fixed right-5 top-5 z-[9999] w-[380px] max-w-[calc(100vw-40px)]">
          <div className="pointer-events-auto">
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        </div>
      )}

      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? "Chỉnh sửa Tour" : "Thêm Tour"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEdit
                ? "Cập nhật đầy đủ thông tin của tour"
                : "Nhập thông tin để tạo tour mới"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Thông tin cơ bản
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tên tour
                  </label>

                  <input
                    type="text"
                    name="nameTour"
                    value={form.nameTour}
                    onChange={handleChange}
                    placeholder="Nhập tên tour"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div ref={locationWrapperRef} className="relative">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Điểm đến
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="destination"
                      value={form.destination}
                      onChange={handleDestinationChange}
                      onFocus={() => {
                        if (form.destination.trim().length >= 2) {
                          setShowLocationSuggestions(true);
                        }
                      }}
                      placeholder="Nhập tên tỉnh, thành phố..."
                      autoComplete="off"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />

                    {loadingLocations && (
                      <LoaderCircle
                        size={17}
                        className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-cyan-500"
                      />
                    )}
                  </div>

                  {showLocationSuggestions &&
                    form.destination.trim().length >= 2 && (
                      <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                        {loadingLocations ? (
                          <div className="flex items-center gap-2 px-4 py-4 text-sm text-slate-500">
                            <LoaderCircle
                              size={17}
                              className="animate-spin text-cyan-500"
                            />

                            <span>Đang tìm tỉnh/thành phố...</span>
                          </div>
                        ) : locationSuggestions.length > 0 ? (
                          <div className="max-h-72 overflow-y-auto">
                            {locationSuggestions.map((location, index) => {
                              const locationName =
                                location.name || "Không có tên";

                              const divisionType = location.division_type || "";

                              const codename = location.codename || "";

                              return (
                                <button
                                  key={`${location.code}-${index}`}
                                  type="button"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => handleSelectLocation(location)}
                                  className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-cyan-50"
                                >
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
                                    <MapPin size={17} />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-700">
                                      {locationName}
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                      {divisionType && (
                                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                                          {divisionType}
                                        </span>
                                      )}

                                      {codename && (
                                        <span className="truncate text-xs text-slate-400">
                                          {codename}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="px-4 py-4 text-sm text-slate-400">
                            Không tìm thấy tỉnh/thành phố phù hợp.
                          </div>
                        )}
                      </div>
                    )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Thời gian tour
                  </label>

                  <input
                    type="text"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="Ví dụ: 3n2đ"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Mô tả
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Nhập mô tả tour"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Thông tin khởi hành
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Ngày khởi hành
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="dateDepartDisplay"
                      type="text"
                      value={
                        form.dateDepart
                          ? (() => {
                              const [year, month, day] =
                                form.dateDepart.split("-");

                              return year && month && day
                                ? `${day}/${month}/${year}`
                                : "";
                            })()
                          : ""
                      }
                      placeholder="DD/MM/YYYY"
                      maxLength={10}
                      readOnly
                      onClick={() => {
                        document
                          .getElementById("dateDepartPicker")
                          ?.showPicker?.();
                      }}
                      className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                    />

                    <input
                      id="dateDepartPicker"
                      type="date"
                      value={
                        /^\d{4}-\d{2}-\d{2}$/.test(form.dateDepart || "")
                          ? form.dateDepart
                          : ""
                      }
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          dateDepart: e.target.value,
                        }));
                      }}
                      className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                      tabIndex={-1}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Giờ khởi hành
                  </label>

                  <input
                    type="time"
                    name="timeDepart"
                    value={form.timeDepart}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Số khách tối đa
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="maxPeople"
                    value={form.maxPeople}
                    onChange={handleChange}
                    placeholder="20"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Trạng thái
                  </label>

                  <select
                    name="statusTour"
                    value={form.statusTour}
                    onChange={handleChange}
                    disabled={loadingTourStatuses}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                  >
                    <option value="">
                      {loadingTourStatuses
                        ? "Đang tải trạng thái..."
                        : "Chọn trạng thái"}
                    </option>

                    {tourStatuses.map((status, index) => {
                      const value =
                        typeof status === "string"
                          ? status
                          : (status.statusTour ??
                            status.value ??
                            status.code ??
                            status.name);

                      const label =
                        typeof status === "string"
                          ? status
                          : (status.label ??
                            status.name ??
                            status.description ??
                            status.statusTour ??
                            value);

                      return (
                        <option key={value ?? index} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  {!loadingTourStatuses && tourStatuses.length === 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Không có trạng thái tour.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Giá tour
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Giá người lớn
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      name="priceAdult"
                      value={form.priceAdult}
                      onChange={handleChange}
                      placeholder="5000000"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      ₫
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Giá trẻ em
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      name="priceChildren"
                      value={form.priceChildren}
                      onChange={handleChange}
                      placeholder="3000000"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      ₫
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Thông tin liên hệ
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Số điện thoại
                  </label>

                  <input
                    type="text"
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="0964765378"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Video & khuyến mãi
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Video giới thiệu
                  </label>

                  <input
                    type="url"
                    name="introVideo"
                    value={form.introVideo}
                    onChange={handleChange}
                    placeholder="https://youtu.be/..."
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Link khuyến mãi
                  </label>

                  <input
                    type="url"
                    name="promotionLink"
                    value={form.promotionLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  {currentUser?.role === "ADMIN"
                    ? "Phân công & danh mục"
                    : "Danh mục"}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {currentUser?.role === "ADMIN"
                    ? "ADMIN có quyền phân công nhân viên phụ trách và chọn danh mục cho tour."
                    : "Chọn danh mục phù hợp cho tour."}
                </p>
              </div>

              <div
                className={`grid grid-cols-1 gap-5 ${
                  currentUser?.role === "ADMIN"
                    ? "md:grid-cols-2"
                    : "md:grid-cols-1"
                }`}
              >
                {currentUser?.role === "ADMIN" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Nhân viên phụ trách
                    </label>

                    <select
                      name="userId"
                      value={form.userId}
                      onChange={handleChange}
                      disabled={loadingStaff}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                    >
                      <option value="">
                        {loadingStaff
                          ? "Đang tải danh sách..."
                          : "Chọn nhân viên phụ trách"}
                      </option>

                      {staffUsers.map((user) => (
                        <option key={user.idUser} value={user.idUser}>
                          {user.fullName || user.email}

                          {user.email ? ` - ${user.email}` : ""}
                        </option>
                      ))}
                    </select>

                    {!loadingStaff && staffUsers.length === 0 && (
                      <p className="mt-2 text-xs text-red-500">
                        Không có nhân viên để phân công.
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Danh mục
                  </label>

                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    disabled={loadingCategories}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                  >
                    <option value="">
                      {loadingCategories
                        ? "Đang tải danh mục..."
                        : "Chọn danh mục"}
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.idCategory}
                        value={category.idCategory}
                      >
                        {category.nameCategory}
                      </option>
                    ))}
                  </select>

                  {!loadingCategories && categories.length === 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Không có danh mục.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  Hình ảnh tour
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Có thể chọn nhiều ảnh cùng lúc
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tour-images"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                  <ImagePlus size={17} />
                  Chọn ảnh
                </label>

                <input
                  id="tour-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {existingImages.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ảnh hiện tại
                  </p>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {existingImages.map((image) => {
                      const imageUrl =
                        image.imgaeUrl ||
                        image.imageUrl ||
                        image.image ||
                        image.url;

                      const isThumbnail = Boolean(image.thumbnail);

                      const isUpdating = updatingThumbnailId === image.idImage;

                      return (
                        <div
                          key={image.idImage}
                          onClick={() => {
                            if (!isThumbnail && !isUpdating) {
                              handleSetThumbnail(image.idImage);
                            }
                          }}
                          className={`group relative cursor-pointer overflow-hidden rounded-xl bg-slate-100 transition-all ${
                            isThumbnail
                              ? "border-2 border-cyan-500 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/20"
                              : "border border-slate-200 hover:border-cyan-300 hover:shadow-md"
                          }`}
                        >
                          <div className="aspect-[4/3]">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt="Tour"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                No image
                              </div>
                            )}
                          </div>

                          <div
                            className="absolute left-2 top-2 z-10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label
                              className={`flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 shadow-md backdrop-blur-sm ${
                                isThumbnail
                                  ? "bg-cyan-500 text-white"
                                  : "bg-white/95 text-slate-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="tourThumbnail"
                                checked={isThumbnail}
                                disabled={isUpdating}
                                onChange={() =>
                                  handleSetThumbnail(image.idImage)
                                }
                                className="h-4 w-4 cursor-pointer accent-cyan-500"
                              />

                              <span className="text-[11px] font-semibold">
                                {isUpdating
                                  ? "Đang cập nhật..."
                                  : "Ảnh đại diện"}
                              </span>
                            </label>
                          </div>

                          {isUpdating && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
                              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                                Đang cập nhật...
                              </div>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              handleRemoveExistingImage(image);
                            }}
                            disabled={
                              deletingImageId === image.idImage || isUpdating
                            }
                            className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingImageId === image.idImage ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                              <X size={16} />
                            )}
                          </button>

                          {isThumbnail && (
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-amber-600 shadow">
                              <Star size={11} fill="currentColor" />
                              Ảnh đại diện
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {newImages.length > 0 && (
                <div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Ảnh mới
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Chọn một ảnh làm ảnh đại diện cho tour
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {newImages.map((image) => {
                      const isThumbnail = image.isThumbnail === true;

                      return (
                        <div
                          key={image.id}
                          className={`group relative overflow-hidden rounded-xl bg-slate-100 transition-all ${
                            isThumbnail
                              ? "border-2 border-cyan-500 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/20"
                              : "border border-slate-200 hover:border-cyan-300 hover:shadow-md"
                          }`}
                        >
                          <div className="aspect-[4/3]">
                            <img
                              src={image.preview}
                              alt={image.file.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div
                            className="absolute left-2 top-2 z-20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label
                              className={`flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 shadow-md backdrop-blur-sm ${
                                isThumbnail
                                  ? "bg-cyan-500 text-white"
                                  : "bg-white/95 text-slate-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="newTourThumbnail"
                                checked={isThumbnail}
                                onChange={() => handleSetNewThumbnail(image.id)}
                                className="h-4 w-4 cursor-pointer accent-cyan-500"
                              />

                              <span className="text-[11px] font-semibold">
                                Ảnh đại diện
                              </span>
                            </label>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(image.id)}
                            className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600"
                            title="Bỏ ảnh"
                          >
                            <X size={16} />
                          </button>

                          {isThumbnail && (
                            <div className="absolute bottom-8 left-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-amber-600 shadow">
                              <Star size={11} fill="currentColor" />
                              Ảnh đại diện
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 truncate bg-black/50 px-2 py-1.5 text-[10px] text-white">
                            {image.file.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {existingImages.length === 0 && newImages.length === 0 && (
                <label
                  htmlFor="tour-images"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 transition hover:border-cyan-300 hover:bg-cyan-50/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <ImagePlus size={22} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    Chưa có hình ảnh
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Bấm để chọn một hoặc nhiều ảnh
                  </p>
                </label>
              )}
            </section>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="h-[17px] w-[17px] animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Save size={17} />
              )}

              {saving ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Thêm tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
