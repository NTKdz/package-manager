import { setLoading } from "@/redux/slices/loadingSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const baseUrl = "http://localhost:8080/packages";
export default function Analytics() {
  const dispatch = useDispatch();
  async function getPackageData() {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(baseUrl);
      console.log(response.data);
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { getPackageData };
}
