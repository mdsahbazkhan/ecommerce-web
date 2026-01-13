import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency='₹'

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster richColors position="top-right" />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex">
            <Sidebar />

            {/* Main Content */}
            <div className=" w-[75%] mx-auto ml-[max(3.5vw,25px)] my-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
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
