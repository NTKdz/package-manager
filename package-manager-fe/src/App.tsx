import axios from "axios";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getLoginUrl } from "./helper/SSOHelper";
import { router } from "./routes";
import SSOService from "./services/SSOService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { getUserInfoSSO, getRefreshUserInfoSSO } = SSOService();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || parseJwt(accessToken) || !refreshToken) {
      if (!refreshToken || parseJwt(refreshToken)) {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (!code) {
          window.location.href = getLoginUrl({
            realmUrl: "http://localhost:8081/realms/package/",
            clientId: "package-manager",
            callbackUrl: "http://localhost:5173/order",
            scope: "openid profile email",
            logoutCallbackUrl: "http://localhost:5173/order",
          });
        } else {
          getUserInfoSSO(code).then(() => {
            setIsAuthenticated(true);
          });
        }
      } else {
        setupTokenRefresh();
      }
    } else {
      setupTokenRefresh();
    }
  }, []);

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decode = JSON.parse(atob(base64));
      return decode.exp * 1000 < new Date().getTime();
    } catch (error) {
      console.error("Failed to parse JWT:", error);
      return true;
    }
  };

  const setupTokenRefresh = () => {
    const checkInterval = 1 * 60 * 1000;
    const token = localStorage.getItem("access_token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decode = JSON.parse(atob(base64));
      setInterval(() => {
        const newToken = localStorage.getItem("access_token");
        if (newToken) {
          const base64Url = newToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decode = JSON.parse(atob(base64));

          if (decode.exp * 1000 < new Date().getTime()) {
            getRefreshUserInfoSSO(
              localStorage.getItem("refresh_token") || ""
            ).then(() => {
              setIsAuthenticated(true);
            });
            console.log("Time Expired");
          } else {
            console.log("Token is still valid");
          }
        }
      }, checkInterval);

      if (decode.exp * 1000 > new Date().getTime()) {
        console.log("Token is still valid");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
      } else {
        console.log("Token is expired");
        getRefreshUserInfoSSO(localStorage.getItem("refresh_token") || "").then(
          () => {
            setIsAuthenticated(true);
          }
        );
      }

      setIsAuthenticated(true);
    }
  };

  return (
    <>{isAuthenticated && <RouterProvider router={router}></RouterProvider>}</>
  );
}

export default App;
