import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegUserCircle } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoIosStats } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import ConfigView from "@/views/config-view/ConfigView";
import { GrConfigure } from "react-icons/gr";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navOptions, setNavOptions] = useState<string[]>([
    "Đơn hàng",
    "Quản lý",
    "Cài đặt",
  ]);
  const [selectedTab, setSelectedTab] = useState<string>(
    location.pathname.startsWith("/order")
      ? "Đơn hàng"
      : location.pathname.startsWith("/user")
      ? "Người dùng"
      : location.pathname.startsWith("/manage")
      ? "Quản lý"
      : "Đơn hàng"
  );
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    localStorage.getItem("role") !== "[admin]" &&
      setNavOptions(["Đơn hàng", "Cài đặt"]);
  }, []);
  function getIcon(option: string) {
    switch (option) {
      case "Cài đặt":
        return <GrConfigure />;

      case "Quản lý":
        return <IoIosStats />;

      case "Đơn hàng":
        return <GoPackage />;
    }
  }

  function navigateToPage(option: string) {
    switch (option) {
      case "Quản lý":
        navigate("/manage/chart");
        break;

      case "Đơn hàng":
        navigate("/order");
        break;
    }
  }
  return (
    <div>
      <div
        className={`fixed ${
          isMinimized ? "w-16" : "w-[200px]"
        } mb-0 h-full bg-primary p-2 transition-all`}
      >
        <div
          className={`w-full h-10 font-bold rounded-sm flex justify-end items-center mb-2 hover:cursor-pointer hover:opacity-90 ${
            isMinimized && "justify-center"
          }`}
          onClick={() => {
            setIsMinimized(!isMinimized);
          }}
        >
          {isMinimized ? (
            <FaArrowLeft className="text-white w-6 h-6" />
          ) : (
            <FaArrowRight className="text-white w-6 h-6" />
          )}
        </div>
        {navOptions.map((option) =>
          option !== "Cài đặt" ? (
            <div
              key={option}
              className={`w-full h-10 ${
                selectedTab === option ? "bg-primary-foreground" : "text-white"
              } font-bold rounded-sm flex gap-2 items-center ${
                !isMinimized && "pl-2"
              } mb-2 hover:cursor-pointer hover:opacity-90 hover:bg-primary-foreground hover:text-primary ${
                isMinimized && "justify-center"
              } transition-all`}
              onClick={() => {
                if (option !== "Cài đặt") {
                  setSelectedTab(option);
                  navigateToPage(option);
                }
              }}
            >
              {getIcon(option)}

              {!isMinimized && (
                <span
                  className={`fadeIn
              `}
                >
                  {option}
                </span>
              )}
            </div>
          ) : (
            <div key={option}>
              <ConfigView isMinimized={isMinimized} />
            </div>
          )
        )}
      </div>
      <div
        className={`w-${
          isMinimized ? "16" : "[200px]"
        } transition-all float-left`}
      ></div>
    </div>
  );
}
