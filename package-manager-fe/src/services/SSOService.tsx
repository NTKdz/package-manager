import { userInfo } from "@/interface/authInterface";
import axios from "axios";

const baseUrl = "http://localhost:8080/sso/auth";
export default function SSOService() {
  async function getUserInfoSSO(code: string) {
    console.log("getinfo");
    try {
      const response = await axios.post(`${baseUrl}/user`, {
        code: code,
        clientId: "package-manager",
        realmUrl: "http://localhost:8081/realms/package/",
        callbackUrl: "http://localhost:5173/order",
      });
      if (response.status === 200) {
        console.log(response.data);
        const data: userInfo = response.data;
        const {
          id_token,
          access_token,
          refresh_token,
          displayName,
          username,
          role,
          department,
        } = data;

        localStorage.setItem("id_token", id_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("displayName", displayName);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("department", department);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        window.location.href = "http://localhost:5173/order";
        return response;
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from :`, e);
    }
  }

  async function getRefreshUserInfoSSO(code: string) {
    console.log("refresh", code);
    try {
      const response = await axios.post(`${baseUrl}/refresh`, {
        rfToken: code,
        clientId: "package-manager",
        realmUrl: "http://localhost:8081/realms/package/",
        callbackUrl: "http://localhost:5173/order",
      });

      if (response.status === 200 && response.data.status) {
        console.log(response.data);
        const data: userInfo = response.data;
        const { id_token, access_token, refresh_token } = data;

        localStorage.setItem("id_token", id_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        console.log(response);
        return response;
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from :`, e);
    }
  }

  return { getUserInfoSSO, getRefreshUserInfoSSO };
}
