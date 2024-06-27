import { userInfo } from "@/interface/authInterface";
import axios from "axios";

const baseUrl = "http://localhost:8080/sso/auth";
export default function SSOService() {
  async function getUserInfoSSO(code: string) {
    console.log("getinfo");
    try {
      const response = await axios.get(`${baseUrl}/user`, {
        params: {
          code: code,
          clientId: "package-manager",
          realmUrl: "http://localhost:8081/realms/package/",
          callbackUrl: "http://localhost:3000",
        },
      });
      if (response.status === 200) {
        const data: userInfo = response.data;
        const { access_token, refresh_token } = data;
        // Store tokens in localStorage or state as needed
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from :`, e);
    }
  }
  return { getUserInfoSSO };
}
