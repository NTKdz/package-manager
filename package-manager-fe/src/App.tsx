import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getLoginUrl } from "./helper/SSOHelper";
import { router } from "./routes";
import SSOService from "./services/SSOService";
import ConfigView from "./views/config-view/ConfigView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isFirstTimeLogin, setIsFirstTimeLogin] = React.useState(false);
  const { getUserInfoSSO } = SSOService();

  useEffect(() => {
    console.log(
      !localStorage.getItem("access_token"),
      "should call for accesstoken"
    );
    if (!localStorage.getItem("access_token")) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (!code)
        window.location.href = getLoginUrl({
          realmUrl: "http://localhost:8081/realms/package/",
          clientId: "package-manager",
          callbackUrl: "http://localhost:5173",
          scope: "openid profile email",
          logoutCallbackUrl: "http://localhost:5173",
        });
      console.log("Authorization code:", code);
      getUserInfoSSO(code ?? "").then((res) => {
        console.log(res?.data.isFirstTimeLogin);
        setIsFirstTimeLogin(res?.data.isFirstTimeLogin);
        setIsAuthenticated(true);
      });
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isFirstTimeLogin && (
        <ConfigView defaultOpen={true} disableTrigger={true} />
      )}
      {isAuthenticated && <RouterProvider router={router}></RouterProvider>}
    </>
  );
}

export default App;
