import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <Toaster richColors position="top-right" />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Fixed Navbar */}
          <div className="h-16 fixed top-0 left-0 right-0 z-30 bg-white shadow">
            <Navbar
              setToken={setToken}
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>

          <div className="flex pt-16 h-full">
            {/* Fixed Sidebar - hidden on mobile, toggleable */}
            <div
              className={`
                fixed lg:static top-16 inset-y-0 left-0 z-20
                w-64 bg-white border-r overflow-y-auto
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              `}
            >
              <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                token={token}
              />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-10"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Scrollable Content */}
            <div className="flex-1 lg:ml-1  4 h-full overflow-y-auto p-4 lg:p-6">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 min-h-full">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={<AdminDashboard token={token} />}
                  />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route
                    path="/messages"
                    element={<Messages token={token} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
