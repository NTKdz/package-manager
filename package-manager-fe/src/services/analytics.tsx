import {
  HttpPackageInterface,
  PackageInterface,
} from "@/interface/packageInterface";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setPackage } from "@/redux/slices/packageSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const baseUrl = "http://localhost:8081/packages";
export default function Analytics() {
  const dispatch = useDispatch();
  async function getPackageData() {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(baseUrl);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setPackage(response.data));
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { getPackageData };
}
