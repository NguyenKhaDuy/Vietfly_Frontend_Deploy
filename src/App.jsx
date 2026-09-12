import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import StaffLayout from "./layouts/StaffLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";

// User pages
import Home from "./pages/user/Home";
import TourPage from "./pages/user/TourPage";
import TourDetail from "./pages/user/TourDetail";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";

// Auth
import Login from "./pages/Login";

// Staff pages
import StaffTourManagement from "./pages/staff/StaffTourManagement";
import StaffTourItineraryManagement from "./pages/staff/StaffTourItineraryManagement";
import StaffTourDetail from "./pages/staff/StaffTourDetail";
import StaffBookingManagement from "./pages/staff/StaffBookingManagement";
import StaffFeedbackManagement from "./pages/staff/StaffFeedbackManagement";
import StaffBannerManagement from "./pages/staff/StaffBannerManagement";
import ProfileInfor from "./pages/staff/PersonalInfo";
import StaffTourPriceManagement from "./pages/staff/StaffTourPriceManagement";

//admin page
import UserManagement from "./pages/admin/UserManagement";
import TourManagement from "./pages/admin/TourManagement";
import TourItineraryManagement from "./pages/admin/TourItineraryManagement";
import TourAdminDetail from "./pages/admin/TourDetail";
import BannerManagement from "./pages/admin/BannerManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import AdminAccount from "./pages/admin/AdminAccount";
import TourPriceManagement from "./pages/admin/TourPriceManagement";

import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="tours" element={<TourPage />} />
          <Route path="tours/:id" element={<TourDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute allowedRoles={["STAFF"]} />}>
          <Route path="/staff" element={<StaffLayout />}>
            <Route path="tours" element={<StaffTourManagement />} />
            <Route
              path="tours/:idTour/itineraries"
              element={<StaffTourItineraryManagement />}
            />
            <Route path="tours/:idTour" element={<StaffTourDetail />} />
            <Route path="bookings" element={<StaffBookingManagement />} />
            <Route path="feedbacks" element={<StaffFeedbackManagement />} />
            <Route path="banners" element={<StaffBannerManagement />} />
            <Route path="profile" element={<ProfileInfor />} />
            <Route
              path="tours/:idTour/price"
              element={<StaffTourPriceManagement />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<UserManagement />} />
            <Route path="tours" element={<TourManagement />} />
            <Route
              path="tours/:idTour/itineraries"
              element={<TourItineraryManagement />}
            />
            <Route path="tours/:idTour" element={<TourAdminDetail />} />
            <Route path="banners" element={<BannerManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="feedbacks" element={<FeedbackManagement />} />
            <Route path="account" element={<AdminAccount />} />
            <Route
              path="tours/:idTour/price"
              element={<TourPriceManagement />}
            />
          </Route>
        </Route>

        <Route
          path="/403"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-7xl font-black text-slate-200">403</h1>

                <h2 className="mt-3 text-2xl font-bold text-slate-800">
                  Không có quyền truy cập
                </h2>

                <p className="mt-2 text-slate-500">
                  Tài khoản của bạn không có quyền truy cập trang này.
                </p>

                <a
                  href="/"
                  className="mt-6 inline-block rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  Về trang chủ
                </a>
              </div>
            </div>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
