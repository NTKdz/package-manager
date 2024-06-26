import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { useEffect, useRef, useState } from "react";
import Keycloak from "keycloak-js";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code,"the codex `")
    const keycloak = new Keycloak({
      url: "http://localhost:8081/",
      realm: "package",
      clientId: "package-manager",
    });

    keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
      
        if (authenticated) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${keycloak.token}`;

          keycloak.onTokenExpired = () => {
            keycloak
              .updateToken(70)
              .then((refreshed) => {
                if (refreshed) {
                  axios.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${keycloak.token}`;
                }
              })
              .catch(() => {
                console.error("Failed to refresh token");
              });
          };
        }
      })
      .catch((error) => {
        console.error("Failed to initialize Keycloak", error);
      });  console.log(keycloak)
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to the App</h1>
      </div>
      <React.StrictMode>
        {/* <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider> */}
      </React.StrictMode>
    </>
  );
}

export default App;
