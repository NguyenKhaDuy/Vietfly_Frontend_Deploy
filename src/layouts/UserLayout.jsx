import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout;
