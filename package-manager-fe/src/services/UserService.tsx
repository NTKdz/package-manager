import { setLoading } from "@/redux/slices/loadingSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const baseUrl = "http://localhost:8080/users";
export default function UserService() {
  const dispatch = useDispatch();
  async function updateUser(username: string, department: string) {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(baseUrl + "/update", {
        username: username,
        department: department,
      });
      if (response.status === 200) {
        console.log("table update", response);
        localStorage.setItem("department", response.data.department);
      }
      return response;
    } catch (e) {
      console.log((e as Error).message);
    }
  }
  return { updateUser };
}
