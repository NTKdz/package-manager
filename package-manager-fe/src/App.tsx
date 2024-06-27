import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getLoginUrl } from "./helper/SSOHelper";
import store from "./redux/store";
import { router } from "./routes";
import SSOService from "./services/SSOService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
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
          callbackUrl: "http://localhost:3000",
          scope: "openid profile email",
          logoutCallbackUrl: "http://localhost:3000",
        });
      console.log("Authorization code:", code);
      getUserInfoSSO(code ?? "").then(() => {
        setIsAuthenticated(true);
      });
      // exchangeCodeForToken(code ?? "");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // const exchangeCodeForToken = async (code: string) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/realms/package/protocol/openid-connect/token",
  //       {
  //         grant_type: "authorization_code",
  //         client_id: "package-manager",
  //         code: code,
  //         redirect_uri: "http://localhost:5173",
  //         client_secret: "t7lYljTN1a7OPRo7rqyEuudc6D2C3LcT",
  //         // Add client_secret if required by your Keycloak client configuration
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );
  //     const { access_token, refresh_token } = response.data;
  //     // Store tokens in localStorage or state as needed
  //     localStorage.setItem("access_token", access_token);
  //     localStorage.setItem("refresh_token", refresh_token);

  //     axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.error("Token exchange failed:", error);
  //   }
  // };
  return (
    <>
      {isAuthenticated && (
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      )}
    </>
  );
}

export default App;
