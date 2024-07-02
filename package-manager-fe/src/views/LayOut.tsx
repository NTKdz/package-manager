import NavBar from "@/components/custom/nav-bar/NavBar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function LayOut() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("department") === "none" && navigate("/config");
  }, []);
  
  const getTitle = () => {
    if (location.pathname.startsWith("/order") || location.pathname === "/") {
      return "Trang chủ";
    } else if (location.pathname.startsWith("/user")) {
      return "Người dùng";
    } else if (location.pathname.startsWith("/manage")) {
      return "Thông số";
    }
  };
  return (
    <div className="flex">
      <NavBar />

      <div className="mt-4 w-full min-w-0 mb-10">
        <div className="w-full pl-10">
          <h1 className="text-2xl font-bold">{getTitle()}</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
